# Product Specification

## Nome

Pequenos Registros

## Descrição

Pequenos Registros é um álbum digital para pais registrarem momentos importantes da infância de seus filhos.

O usuário poderá criar um álbum para seu bebê e registrar marcos importantes através de fotos, datas e pequenos textos.

## Público

Pais e responsáveis que desejam guardar memórias da infância de seus filhos de forma organizada e afetiva.

## Objetivo do MVP

Permitir que um usuário:

1. Crie uma conta.
2. Cadastre um bebê.
3. Visualize marcos sugeridos automaticamente.
4. Adicione fotos aos marcos.
5. Adicione um texto sobre cada momento.
6. Edite ou remova registros.
7. Visualize o álbum de forma bonita.
8. Compartilhe o álbum.

## Fluxo principal

Cadastro

↓

Cadastro do bebê

↓

Álbum

↓

Marcos

↓

Adicionar fotos e textos

↓

Visualização do álbum

## Autenticação

O usuário deverá possuir:

- cadastro
- login
- logout
- recuperação de senha

A autenticação será realizada utilizando Supabase Auth.

## Bebê

O usuário poderá cadastrar:

- nome
- apelido
- data de nascimento
- foto de perfil do bebê

Inicialmente, cada álbum estará associado a um bebê.

## Marcos

Ao cadastrar um bebê, o sistema criará automaticamente alguns marcos sugeridos.

Exemplos:

- Teste de gravidez
- Primeiro ultrassom
- Chá revelação
- Nascimento
- Primeiro banho
- Primeiro sorriso
- Primeiro dentinho
- Primeiros passos
- Primeira palavra
- Primeiro aniversário

O usuário poderá:

- editar o nome do marco
- adicionar data
- adicionar comentário
- adicionar fotos
- excluir fotos
- ocultar marcos
- adicionar novos marcos

## Visualização

A visualização do álbum deve mostrar apenas os marcos que possuem registros.

A experiência deve ser principalmente visual, valorizando as fotografias.

## Edição

A edição será separada da experiência de visualização.

O usuário acessará uma tela ou modal específica para editar um marco.

## Compartilhamento

O usuário poderá compartilhar seu álbum com outras pessoas.

A implementação detalhada do compartilhamento será definida posteriormente.

## Personalização

A personalização visual será implementada futuramente.

Possíveis opções:

- paleta de cores
- fontes
- estilos do álbum

## Fora do escopo do MVP

O Figma de fluxo já prevê alguns itens de tela que não fazem parte do MVP, mas que devem existir na interface (menu de Configurações) apontando para um estado "em breve", em vez de serem escondidos:

- **Editar paleta de cores**: personalização visual (ver seção acima).
- **Criar novo álbum**: suporte a múltiplos bebês/álbuns por conta. No MVP, cada conta possui um único bebê/álbum.
