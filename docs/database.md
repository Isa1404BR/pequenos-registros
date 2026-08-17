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
- created_at
- updated_at

## baby_milestones

Representa os marcos de um bebê específico.

O usuário poderá personalizar esses registros.

Campos previstos:

- id
- baby_id
- title
- description
- is_hidden
- created_at
- updated_at

## photos

Representa fotos associadas a um marco.

Campos previstos:

- id
- milestone_id
- storage_path
- created_at
- updated_at

## Segurança

Usuários devem conseguir acessar apenas os dados aos quais possuem permissão.

Row Level Security (RLS) deverá ser utilizada.

## Migrations

Alterações no banco devem ser realizadas através de migrations versionadas no Git.

Não realizar alterações estruturais diretamente no banco de produção sem uma migration correspondente.