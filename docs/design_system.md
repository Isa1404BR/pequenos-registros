# Design System

## Direção visual

O Pequenos Registros deve transmitir:

- carinho
- leveza
- tranquilidade
- infância
- memórias
- simplicidade

## Estilo

- Cores claras e pastéis
- Tipografia suave
- Cantos arredondados
- Sombras discretas
- Bastante espaço entre elementos
- Interface limpa
- Fotografias como elemento visual principal

## Responsividade

Mobile-first.

Priorizar telas de aproximadamente:

- 375px
- 390px
- 430px

Depois adaptar para tablets e desktops.

## Ferramentas

O fluxo de telas (estrutura, navegação e componentes) está definido no Figma do projeto.

A identidade visual (cores, tipografia, formatos) ainda não está definida no Figma — a proposta abaixo é um ponto de partida para implementação, podendo ser refinada conforme o Figma evoluir.

## Cores

Paleta pastel provisória, a ser validada visualmente durante a implementação:

### Primary

`#F4A9B8` (rosa pastel)

### Secondary

`#A8D8C9` (verde-água pastel)

### Background

`#FFF8F3` (off-white quente)

### Text

`#4A4038` (marrom acinzentado escuro, para contraste com fundo claro)

### Error

`#E27D7D`

### Success

`#8FBF9F`

Esses tokens devem ser centralizados em `src/styles` (ex: `theme.ts`) e consumidos via `ThemeProvider` do styled-components.

## Tipografia

Fonte principal proposta: **Quicksand** (Google Fonts) — traços arredondados, transmite leveza e acolhimento, combina com a direção visual do projeto.

Fonte de apoio (textos longos, se necessário): **Nunito Sans**, para melhor legibilidade em blocos de texto.

## Border radius

Escala proposta:

- sm: 8px
- md: 12px
- lg: 20px
- pill: 999px (botões/tags arredondados)

## Espaçamento

Escala baseada em múltiplos de 4px: 4, 8, 12, 16, 24, 32, 48, 64.

## Estilização

Implementação via styled-components, com os tokens acima expostos em um `theme.ts` e injetados através de `ThemeProvider`.

## Componentes

Componentes iniciais:

- Button
- Input
- Textarea
- Card
- Modal
- Header
- Navigation
- PhotoCard
- MilestoneCard
- UploadImage