# AGENTS.md

## Projeto

Pequenos Registros é uma aplicação web para pais registrarem e preservarem momentos importantes da infância de seus filhos.

O projeto será inicialmente desenvolvido como uma aplicação web mobile-first, com foco principal em smartphones.

## Objetivo

O projeto será utilizado como portfólio profissional de desenvolvimento de software.

O código deve priorizar:

- qualidade
- legibilidade
- manutenção
- reutilização
- acessibilidade
- responsividade
- segurança
- boas práticas de engenharia de software

## Stack

- React
- TypeScript
- Vite
- Supabase
- PostgreSQL
- Supabase Storage
- Git
- GitHub
- Vercel

## Arquitetura

A estrutura principal do projeto deve seguir:

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

## Regras de código

- Utilizar TypeScript.
- Evitar `any`.
- Tipar props, estados e retornos de funções quando apropriado.
- Utilizar componentes funcionais.
- Utilizar nomes claros e descritivos.
- Componentes React devem utilizar PascalCase.
- Funções e variáveis devem utilizar camelCase.
- Não duplicar lógica desnecessariamente.
- Criar componentes reutilizáveis quando fizer sentido.
- Manter componentes pequenos e com responsabilidades claras.
- Não colocar lógica de acesso ao banco diretamente nas telas.
- Toda comunicação com o Supabase deve ser feita através de services/hooks apropriados.
- Não colocar credenciais ou secrets diretamente no código.
- Utilizar variáveis de ambiente para informações sensíveis.
- Priorizar acessibilidade.
- Priorizar mobile-first.
- Não adicionar bibliotecas sem necessidade.

## Organização

### screens

Contém páginas completas da aplicação.

Cada screen deve possuir sua própria pasta.

Exemplo:

screens/
└── Login/
    ├── index.tsx
    └── styles.ts

### components

Contém componentes reutilizáveis entre diferentes telas.

Exemplos:

- Button
- Input
- Modal
- Card
- Header
- PhotoUpload

### services

Contém a comunicação com serviços externos, principalmente Supabase.

As screens não devem acessar o Supabase diretamente.

### hooks

Contém hooks customizados relacionados a lógica reutilizável.

### utils

Contém funções auxiliares puras.

Exemplos:

- formatação de datas
- cálculo de idade do bebê
- validações

### types

Contém tipos e interfaces compartilhados.

### styles

Contém tokens e configurações globais do design system.

## Design

A interface deve seguir o design definido em `docs/design-system.md`.

O design deve utilizar:

- cores claras e pastéis
- tipografia suave
- aparência acolhedora
- interface simples
- bastante espaço visual
- foco em fotografias e memórias

## Processo de desenvolvimento

Antes de implementar uma funcionalidade:

1. Entender os requisitos.
2. Consultar a documentação existente.
3. Verificar se já existe algum componente ou função reutilizável.
4. Planejar a implementação.
5. Implementar.
6. Verificar TypeScript e lint.
7. Testar a funcionalidade.
8. Explicar mudanças relevantes.

Não criar arquivos ou dependências desnecessariamente.

## Uso de IA

A IA deve atuar como uma pessoa desenvolvedora do projeto.

Não deve tomar decisões arquiteturais importantes sem explicar a decisão.

Quando houver mais de uma solução razoável, apresentar as alternativas e recomendar uma delas.

Antes de implementar mudanças grandes, explicar brevemente o plano.

Não alterar partes não relacionadas da aplicação sem necessidade.