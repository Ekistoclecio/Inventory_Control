# Inventory Control

## Introdução

Este projeto tem como objetivo elaborar uma aplicação simples de controle de estoque que permite ao usuário fazer login e controlar sua própria lista de produtos.

- O arquivo Documentation.pdf que se encontra dentro da pasta documentation possui uma descrição mais detalhada acerca do funcionamento da aplicação e de cada uma das funcionalidades implementadas.

## Tecnologias utilizadas

### Backend:

- Express
- PostgreSQL
- TypeScript
- Docker
- Docker Compose

O backend foi elaborado no formato de API REST, com persistência de dados em um banco de dados e um sistema de autenticação de usuário baseado em JSON Web Token.

### Frontend:

- React
- Vite
- Material UI
- Axios
- TypeScript

O frontend foi elaborado em React com o auxílio do Vite, utilizando a biblioteca de estilo Material UI para gerar um layout elegante, simples e responsivo.

## Funcionalidades

### Login e Registro de Usuários

Permite que o usuário possa criar uma conta e, a partir dela, realizar o login e ter acesso à aplicação.

### Gerenciamento dos dados do Usuário

Após realizar o login no sistema, o usuário poderá alterar suas informações pessoais, incluindo a senha utilizada no login.

### Gerenciamento de Produtos

Um usuário logado na aplicação poderá registrar produtos, atribuindo um nome e uma quantidade. Os produtos cadastrados serão exibidos na tabela de produtos. Também é possível editar produtos já cadastrados ou excluí-los.

- A tabela de produtos é carregada gradualmente à medida que o usuário realiza o scroll para baixo.

- Cada usuário tem acesso somente à sua lista exclusiva de produtos.

## Executando a aplicação.

### Requisitos:

- Docker
- Docker Compose
- NodeJs

### Ambiente

1. Criar um arquivo .env na pasta backend, seguindo o padrão descrito no arquivo .env.example e mantendo a consistência das informações. Para testes, o ideal é manter as informações como estão, copiando o conteúdo do arquivo .env.example para dentro do arquivo .env criado.

2. Dentro da pasta backend, instalar as dependências do projeto backend localmente utilizando o comando:

```sh
npm i
```

2. Para a criação do container de execução do backend e do banco de dados, executar o comando:

```sh
docker compose up -d
```

3. Em seguida, executar as migrations com o comando:

```sh
npm run migration:run
```

4. Para popular o banco de dados com um usuário de teste e uma lista pré-cadastrada de produtos, executar o comando:

```sh
npm run seed:run
```

- Esse passo é opcional, porém útil para testar o funcionamento da aplicação.

### Executar Frontend

1. Dentro da pasta frontend, para instalar as dependências do projeto, executar o comando:

```sh
npm i
```

2. Para executar a aplicação em modo de desenvolvedor, utilize o comando:

```sh
npm run dev
```

3. A aplicação estará disponível em 'http://localhost:5173/'. Caso tenha executado o passo 4 da seção de ambiente, o sistema já terá um usuário de teste pré-cadastrado no qual é possível realizar o login utilizando os seguintes dados de autenticação.

```sh
E-mail: user@example.com
Senha: example123
```
