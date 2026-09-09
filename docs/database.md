# Database

## Banco

PostgreSQL através do Supabase.

## Entidades previstas

- profiles
- babies
- baby_milestones
- photos

## profiles

Informações adicionais do usuário autenticado.

Relacionamento:

auth.users 1 ─── 1 profiles

Campos previstos:

- id
- name
- email

## babies

Representa o bebê cadastrado pelo usuário.

Campos previstos:

- id
- user_id
- name
- nickname
- birth_date
- photo_url
- shared_with
- created_at
- updated_at

`shared_with` armazena uma lista de e-mails (array) com quem o álbum foi compartilhado. Cada bebê possui apenas um álbum, então o compartilhamento é feito diretamente na tabela `babies`, sem necessidade de tabela de junção.

Usuários presentes em `shared_with` podem apenas visualizar o álbum — não podem editar, ocultar, adicionar ou remover marcos e fotos. Apenas o `user_id` (dono) pode realizar edições.

## baby_milestones

Representa os marcos de um bebê específico.

O usuário poderá personalizar esses registros.

Campos previstos:

- id
- baby_id
- title
- description
- event_date
- is_hidden
- created_at
- updated_at

Cada marco possui apenas uma descrição e uma data (`event_date`) — usada para ordenar os marcos cronologicamente. `created_at`/`updated_at` são metadados do registro, não a data do evento em si.

## photos

Representa a mídia (fotos e vídeo) associada a um marco. Apesar do nome, a tabela guarda os dois tipos, diferenciados por `media_type`.

Cada marco pode ter de 1 a 10 fotos (regra validada na aplicação). Cada foto é limitada a 10 MB na seleção e recomprimida no cliente (máx. 2000 px, WebP/JPEG 80%) antes do upload.

Cada marco pode ter no máximo 1 vídeo, em `.mp4`, de até 60 segundos e 20 MB. O vídeo não é recomprimido; apenas uma miniatura JPEG é gerada no cliente e guardada em `poster_path`.

Campos previstos:

- id
- milestone_id
- storage_path
- media_type (`'photo'` | `'video'`, default `'photo'`)
- poster_path (caminho da miniatura JPEG do vídeo; `null` para fotos)
- tags (array com strings adicionadas pelo usuário ao adicionar a foto)
- created_at
- updated_at

## Storage

Bucket único: `photos` (privado).

Convenção de caminho dos arquivos:

- `{baby_id}/profile/{arquivo}` — foto de perfil do bebê, referenciada em `babies.photo_url`. Não gera linha em `photos`, já que não está associada a um marco.
- `{baby_id}/{milestone_id}/{arquivo}` — fotos e vídeos de marcos, referenciados em `photos.storage_path`. A miniatura de um vídeo fica no mesmo diretório, com sufixo `-poster.jpg`, referenciada em `photos.poster_path`.

As policies de acesso do bucket usam apenas o primeiro segmento do caminho (`baby_id`) para autorizar leitura/escrita, então ambos os casos são cobertos pelas mesmas regras — sem necessidade de buckets ou policies separados.

## Segurança

Usuários devem conseguir acessar apenas os dados aos quais possuem permissão.

Row Level Security (RLS) deverá ser utilizada.

Regras de acesso previstas para `babies`, `baby_milestones` e `photos`:

- o dono (`babies.user_id`) tem acesso total (leitura e escrita).
- um usuário cujo e-mail esteja em `babies.shared_with` tem acesso apenas de leitura (`SELECT`).

## Migrations

Alterações no banco devem ser realizadas através de migrations versionadas no Git.

Não realizar alterações estruturais diretamente no banco de produção sem uma migration correspondente.

## Tipos no frontend

O schema é refletido em `src/types/database.types.ts` (interface `Database`), e o
cliente é tipado com `createClient<Database>()` em `src/services/supabase.ts`. Os tipos
de domínio usados pela aplicação (`Baby`, `Milestone`, `Photo`, ...) ficam em
`src/types/` e são **derivados** desse schema — não redeclarados.

Regenerar após criar uma migration:

```
npm run db:types      # supabase gen types typescript --linked
```

Requer `supabase login` + `supabase link` (ou Docker, trocando `--linked` por
`--local`). Enquanto o link não estiver configurado, `database.types.ts` é mantido
em sincronia com o SQL manualmente.
