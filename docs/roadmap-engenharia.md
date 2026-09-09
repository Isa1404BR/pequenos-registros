# Roadmap de Maturidade de Engenharia

Plano para melhorar confiabilidade e sustentabilidade do projeto, através de: código limpo,
testes, segurança, tratamento de erros, monitoramento de bugs, observabilidade e CI/CD.

## Ordem e justificativa

1. **Código limpo primeiro** — sem tipagem/lint apertados, o resto é construído em terreno instável.
2. **Testes antes de mexer em segurança** — a refatoração de services e RLS precisa de rede de proteção.
3. **Segurança em duas ondas** — triagem barata e de alto impacto cedo; hardening profundo depois dos testes.
4. **Tratamento de erros antes de monitorar** — não adianta capturar erro que a aplicação engole em silêncio.
5. **Bugs → observabilidade → CI** — primeiro enxergar o que quebra em produção, depois métricas/logs, e por fim travar tudo num pipeline.

---

## Fase E1 — Código limpo e padronização

- [x] Ativar `strict: true` + `noUncheckedIndexedAccess` + `noImplicitOverride` no `tsconfig.app.json` e zerar erros
- [x] Endurecer ESLint: `@typescript-eslint/no-explicit-any`, `no-floating-promises`, `exhaustive-deps` como erro, `import-x/order`
- [ ] Adicionar Husky + lint-staged: `eslint --fix` + `prettier` + `tsc --noEmit` no pre-commit
- [ ] Convenção de commits (Conventional Commits) + `commitlint`
- [ ] Definir camadas e proibir atalhos: screen → hook → service → supabase (nunca screen chamando supabase direto). Documentar e validar com `eslint-plugin-boundaries` ou `no-restricted-imports`
- [ ] Centralizar tipos de domínio em `src/types/` e derivar tipos do schema do Supabase (`supabase gen types typescript`)
- [ ] Eliminar duplicação em services (wrapper único de `supabase` com tratamento de erro padronizado)
- [ ] Padronizar barrel exports e nomes de arquivo

## Fase E2 — Testes

- [ ] Configurar Vitest + Testing Library + `@testing-library/jest-dom` + coverage (v8)
- [ ] Testes unitários dos utils (`calculateAge`, `getNextMilestone`, `formatDate`, `compressImage`, `videoMedia`)
- [ ] Testes de services com Supabase mockado (sucesso e erro)
- [ ] Testes de hooks (`useAuth`, `useBaby`, `useMilestones`, `usePhotos`) com `QueryClientProvider` de teste
- [ ] Testes de componentes críticos (`VideoUpload`, `PhotoUpload`, `ProtectedRoute`, `RequireBaby`, `FormError`)
- [ ] Testes de fluxo (login, onboarding do bebê, criar marco com foto/vídeo) com MSW
- [ ] E2E com Playwright para os 3 caminhos felizes principais
- [ ] Meta de cobertura mínima (ex.: 60% linhas) e gate no CI
- [ ] Testes de RLS: `pgTAP` ou testes de integração provando que usuário B não lê álbum de A

## Fase E3 — Segurança (onda 1: triagem rápida)

- [ ] Auditar histórico do git por secrets vazados (`gitleaks`); confirmar que só variáveis `VITE_`-prefixadas são públicas e que a `service_role` key nunca esteve no front
- [ ] Revisar todas as policies RLS de `profiles`, `babies`, `baby_milestones`, `photos` e do bucket de Storage — cobrir SELECT/INSERT/UPDATE/DELETE e o caso `shared_with`
- [ ] Bucket de fotos: confirmar se é privado + URLs assinadas, ou público intencional; políticas de path por `user_id`
- [ ] Headers de segurança no `vercel.json`: CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, HSTS
- [ ] Validar tamanho/tipo/duração de upload no cliente **e** via policy/trigger no Storage
- [ ] `npm audit` + Dependabot/Renovate para atualização de dependências
- [ ] Rate limiting / proteção de brute force no fluxo de auth (config do Supabase Auth, captcha se necessário)

## Fase E4 — Segurança (onda 2: hardening)

- [ ] Validação de schema em todas as bordas com Zod (formulários, respostas de service, env vars)
- [ ] Sanitização de qualquer conteúdo renderizado de usuário (descrições de marco, tags)
- [ ] Revisar exposição de PII em logs e em mensagens de erro para o usuário
- [ ] Política de sessão: refresh token, logout em todas as abas, expiração
- [ ] `security-review` do branch antes de cada release
- [ ] SAST no CI (CodeQL ou `eslint-plugin-security`)
- [ ] Documentar modelo de ameaças em `docs/security.md`

## Fase E5 — Tratamento de erros

- [ ] `ErrorBoundary` global + boundaries por rota, com tela de fallback amigável
- [ ] Tipo de erro de domínio (`AppError` com `code`, `message`, `cause`) retornado pelos services
- [ ] Padronizar erros do TanStack Query: `onError` global, retry/backoff sensato, estados de erro em toda tela
- [ ] Componente de toast/feedback consistente para falhas de mutação
- [ ] Tratamento de offline / falha de rede em uploads (retry, mensagem clara)
- [ ] Nunca engolir `catch` — lint `no-empty` + revisão

## Fase E6 — Monitoramento de bugs

- [ ] Integrar Sentry (browser + source maps no build da Vercel)
- [ ] Capturar exceções não tratadas, rejections e erros do `ErrorBoundary`
- [ ] Release tracking (erro associado ao commit/deploy) e `environment` (preview/prod)
- [ ] Scrubbing de PII antes do envio
- [ ] Alertas: e-mail/Slack para novo tipo de erro e para pico de erros
- [ ] Session Replay (opcional) só em produção e com masking

## Fase E7 — Observabilidade e monitoramento

- [ ] Logger estruturado no front (`level`, contexto, `user_id` anonimizado) com níveis por ambiente
- [ ] Web Vitals (LCP, INP, CLS) enviados para Sentry ou Vercel Analytics
- [ ] Analytics de produto sem cookies invasivos (Vercel Analytics ou Plausible): funil de onboarding, criação de marco, upload
- [ ] Métricas de Supabase: dashboard de uso de DB/Storage/Auth, alerta de quota
- [ ] Uptime check externo (Better Stack / UptimeRobot) na URL de produção
- [ ] Painel único em `docs/observability.md` com links: Sentry, Vercel, Supabase, uptime
- [ ] Definir 2–3 SLIs (taxa de erro JS, p75 de INP, sucesso de upload) e metas

## Fase E8 — CI/CD

- [ ] GitHub Actions: `install → typecheck → lint → test → build` em todo PR
- [ ] Gates obrigatórios: cobertura mínima, sem erro de lint/type, `gitleaks`, `npm audit` (nível high)
- [ ] Preview deploy da Vercel por PR + comentário com link
- [ ] Playwright E2E contra o preview
- [ ] Deploy de produção só no merge para `main` com todos os checks verdes
- [ ] Branch protection em `main`
- [ ] Migrations do Supabase aplicadas via CI (`supabase db push`) com aprovação

## Fase E9 — Performance e acessibilidade

- [ ] `React.lazy` + code splitting por rota; analisar bundle (`rollup-plugin-visualizer`)
- [ ] Auditar re-renders, memoização onde medido, config de cache do TanStack Query
- [ ] Imagens: `loading="lazy"`, `srcset`/tamanhos, formato moderno, revisar `compressImage`
- [ ] Lighthouse CI no pipeline com orçamento de performance
- [ ] Auditoria a11y: `eslint-plugin-jsx-a11y`, `axe` nos testes, navegação por teclado, foco, contraste, labels
- [ ] Testar responsividade real (mobile/tablet/desktop) e fechar os itens da Fase 8 do `roadmap.md`
