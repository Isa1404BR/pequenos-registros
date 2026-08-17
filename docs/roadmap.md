# Roadmap

## Fase 1 — Fundação

- [x] Criar projeto React
- [x] Configurar TypeScript
- [x] Criar repositório Git
- [x] Criar repositório GitHub
- [x] Criar documentação (product-spec, architecture, database, design_system, roadmap)
- [x] Definir stack de estilização (styled-components), roteamento (React Router v7 declarativo) e data-fetching (TanStack Query)
- [x] Remover arquivos desnecessários do pacote Vite (App.tsx, index.css, icons.svg, README)
- [x] Configurar ESLint (revisar regras para o projeto)
- [x] Configurar Prettier
- [x] Instalar dependências definidas (react-router, styled-components, @tanstack/react-query, @supabase/supabase-js)
- [x] Conferir/criar estrutura de pastas (`assets/, components/, contexts/, hooks/, routes/, screens/, services/, styles/, types/, utils/`)
- [x] Criar tema/tokens iniciais em `styles/theme.ts` (cores, tipografia, radius, espaçamento)
- [x] Configurar Supabase (projeto, variáveis de ambiente)

## Fase 2 — Banco

- [x] Modelar entidades (`profiles`, `babies`, `baby_milestones`, `photos`)
- [x] Criar migrations
- [x] Criar tabelas
- [x] Configurar relacionamentos
- [x] Configurar RLS (dono: leitura/escrita; `shared_with`: leitura)
- [x] Configurar Storage (bucket de fotos)

## Fase 3 — Autenticação

- [x] Cadastro
- [x] Login
- [x] Logout
- [x] Recuperação de senha
- [x] AuthContext / useAuth
- [x] Rotas protegidas (React Router v7 declarativo)

## Fase 4 — Onboarding

- [ ] Cadastro do bebê
- [ ] Criação dos marcos padrão

## Fase 5 — Álbum

- [ ] Home
- [ ] Visualização dos marcos (ordenados por `event_date`)
- [ ] Adicionar registro (descrição + data + 1 a 3 fotos)
- [ ] Editar registro
- [ ] Adicionar fotos
- [ ] Remover fotos

## Fase 6 — Configurações

- [ ] Editar bebê
- [ ] Editar marcos
- [ ] Ocultar marcos
- [ ] Criar marco personalizado

## Fase 7 — Compartilhamento

- [ ] Adicionar/remover e-mail em `babies.shared_with`
- [ ] Acesso somente leitura ao álbum para e-mails compartilhados
- [ ] Ocultar ações de edição para usuários convidados

## Fase 8 — Qualidade

- [ ] Testes
- [ ] Responsividade
- [ ] Acessibilidade
- [ ] Performance
- [ ] Tratamento de erros

## Fase 9 — Deploy

- [ ] Configurar Vercel
- [ ] Configurar variáveis de ambiente
- [ ] Configurar CI/CD
- [ ] Deploy de produção
