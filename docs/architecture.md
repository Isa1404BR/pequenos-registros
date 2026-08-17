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

Estrutura de rotas prevista:

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
      ├── /album
      ├── /configuracoes
      └── /primeiros-passos
```

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