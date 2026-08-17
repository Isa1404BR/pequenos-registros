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

Representa fotos associadas a um marco.

Cada marco pode ter de 1 a 3 fotos (regra validada na aplicação).

Campos previstos:

- id
- milestone_id
- storage_path
- tags (array com strings adicionadas pelo usuário ao adicionar a foto)
- created_at
- updated_at

## Storage

Bucket único: `photos` (privado).

Convenção de caminho dos arquivos:

- `{baby_id}/profile/{arquivo}` — foto de perfil do bebê, referenciada em `babies.photo_url`. Não gera linha em `photos`, já que não está associada a um marco.
- `{baby_id}/{milestone_id}/{arquivo}` — fotos de marcos, referenciadas em `photos.storage_path`.

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
