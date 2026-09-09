# Architecture

## Frontend

A aplicação será desenvolvida utilizando React + TypeScript + Vite.

## Backend

O backend será fornecido pelo Supabase.

Serviços utilizados:

- PostgreSQL
- Supabase Auth
- Supabase Storage
- Supabase APIs

## Hosting

O frontend será publicado na Vercel.

## Estrutura

src/
├── assets/
├── components/
├── contexts/
├── hooks/
├── routes/
├── screens/
├── services/
├── styles/
├── types/
└── utils/

## Convenções de arquivo e export

- **Export sempre nomeado.** Nada de `export default` — nem em screens, nem em
  `App`. O nome do símbolo é o mesmo em toda importação.
- **Entrada por pasta, sem barrel agregador.** `components/` e `screens/` usam
  `PascalCase/index.tsx` (+ `styles.ts` quando há styled-components); a pasta é o
  ponto de entrada (`import { Button } from '.../components/Button'`). Não existe
  `components/index.ts` re-exportando tudo — isso prejudica tree-shaking e cria
  risco de import circular.
- **Nomes por camada:**
  - `components/`, `screens/`: `PascalCase/` (pasta) + `index.tsx`
  - `hooks/`: `camelCase.ts`, prefixo `use` (`useBaby.ts`)
  - `services/`: `kebab.service.ts` para services de domínio; infra sem sufixo
    (`client.ts`, `supabase.ts`)
  - `utils/`: `camelCase.ts`
  - `routes/`, `contexts/`: `PascalCase.tsx` / `PascalCase.ts`
  - `types/`: `models.ts` (domínio) e `database.types.ts` (schema, regenerável)

## Screens

Cada página principal da aplicação deve possuir sua própria pasta.

Exemplo:

screens/
└── Login/
├── index.tsx
└── styles.ts

## Components

Componentes reutilizáveis devem ficar em `components`.

Exemplos:

- Button
- Input
- Modal
- Card
- Header
- PhotoCard
- MilestoneCard
- ImageUpload

## Services

Os services serão responsáveis pela comunicação com o Supabase.

Exemplo:

services/
├── auth.service.ts
├── baby.service.ts
├── milestone.service.ts
└── photo.service.ts

As telas não devem realizar chamadas ao Supabase diretamente.

Os services de dados não repetem o padrão `{ data, error }` do Supabase: passam por
`services/client.ts`, que expõe `run()` (queries PostgREST / `rpc`), `runStorage()`
(uploads/remoções) e `createPhotoSignedUrl()`. Todo erro sai como
`SupabaseServiceError` (com o nome da operação na mensagem). Constantes como o nome do
bucket (`PHOTOS_BUCKET`) e o TTL das URLs assinadas ficam nesse arquivo.

## Fronteiras entre camadas

O fluxo de dependência é sempre em um sentido:

```
screen / component  →  hook  →  service  →  supabase
```

Regras (validadas por ESLint via `@typescript-eslint/no-restricted-imports`, ver `eslint.config.js`):

- **Só `src/services/`** pode importar o cliente do Supabase (`services/supabase` ou
  `@supabase/supabase-js`). Qualquer outra camada é barrada pelo lint.
- **Telas e componentes** não importam `*.service` em runtime — acessam dados por hooks
  (`src/hooks/`). Exceções permitidas:
  - `import type` de um service (tipos ainda não centralizados em `src/types/`);
  - `auth.service` (ações imperativas de autenticação, sem dados de query).
- **Contexts** (ex.: `AuthProvider`) podem consumir services diretamente — compõem estado
  global, como um hook.

## Hooks

Hooks devem encapsular lógica reutilizável.

Exemplos:

- useAuth
- useBaby
- useMilestones
- useAlbum

## Routing

As rotas serão gerenciadas utilizando React Router v7, com a abordagem declarativa (`<Routes>`/`<Route>`).

Não serão utilizadas as Data APIs (loaders/actions) neste projeto, para manter a simplicidade — o fetching de dados será feito via hooks (TanStack Query) dentro das screens/componentes.

Rotas protegidas devem exigir autenticação, verificada através de `useAuth()` (AuthContext).

Estrutura de rotas prevista (baseada no fluxo definido no Figma):

```
App
 │
 React Router
 │
 ├── Públicas
 │    ├── /login
 │    └── /cadastro
 │
 └── Protegidas (exigem usuário autenticado)
      ├── /cadastro-bebe        (onboarding, apenas quando o bebê ainda não existe)
      ├── /home                 (resumo: idade, próximo marco, últimos registros)
      ├── /album                (visualização e edição/registro de marcos)
      ├── /familia               (lista de e-mails com acesso ao álbum)
      └── /configuracoes        (editar bebê, editar marcos; itens fora do MVP
                                 ficam visíveis levando a um estado "em breve")
```

A navegação principal (Home / Álbum / Família / Configurações) é a mesma para todas as rotas protegidas.

Um usuário com quem o álbum foi compartilhado (ver seção "Compartilhamento") também deve conseguir acessar `/album` em modo somente leitura, mesmo sem ser o dono do bebê — a autorização de escrita/edição é decidida a nível de service/RLS, não de rota.

## Estado e dados remotos

Evitar gerenciamento global de estado de UI sem necessidade.

Context API será utilizada apenas quando houver necessidade de estado global compartilhado (ex: `AuthContext`).

Para dados vindos do Supabase (fetch, cache, loading, refetch, invalidação após mutações), será utilizado TanStack Query dentro dos hooks (`useBaby`, `useMilestones`, etc.), em vez de implementar esse controle manualmente. Os hooks continuam sendo a única camada que os screens usam para acessar dados — a chamada ao service correspondente fica encapsulada dentro do `useQuery`/`useMutation`.

## Compartilhamento

Cada bebê possui um único álbum.

O álbum pode ser compartilhado com outras pessoas através de e-mail (ver `babies.shared_with` em `database.md`).

Um usuário com e-mail na lista de compartilhamento de um bebê:

- pode visualizar o álbum daquele bebê.
- não pode criar, editar, ocultar ou remover marcos, fotos ou dados do bebê.

Apenas o usuário dono (`babies.user_id`) pode realizar edições. Essa regra deve ser garantida tanto na interface (ocultar ações de edição) quanto no banco (RLS).

Na tela "Família", a árvore ilustrativa é apenas decorativa — não representa dados reais (nomes, papéis ou fotos das pessoas convidadas). O controle de acesso real é a lista de e-mails em `babies.shared_with`, exibida abaixo da ilustração.

## Dados

Dados persistentes devem ser armazenados no Supabase.

Fotos devem ser armazenadas no Supabase Storage (buckets).

O banco deve ser versionado através de migrations.

## Responsividade

O projeto será desenvolvido utilizando abordagem mobile-first.

A interface deve funcionar em:

- smartphones
- tablets
- desktops

## Estilização

A estilização de componentes e telas será feita utilizando styled-components.

## Segurança

Nunca expor secrets no frontend.

Variáveis de ambiente devem ser utilizadas para configurações necessárias.

As tabelas do Supabase devem utilizar Row Level Security (RLS).
