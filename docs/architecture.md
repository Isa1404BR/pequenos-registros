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

As rotas serão gerenciadas utilizando React Router.

Rotas protegidas devem exigir autenticação.

## Estado

Evitar gerenciamento global de estado sem necessidade.

Context API será utilizada apenas quando houver necessidade de estado global compartilhado.

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

## Segurança

Nunca expor secrets no frontend.

Variáveis de ambiente devem ser utilizadas para configurações necessárias.

As tabelas do Supabase devem utilizar Row Level Security (RLS).