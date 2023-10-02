# Inventory_Control

## Executando aplicação

### Requisitos:

- Docker/Docker Compose
- NodeJs

### Ambiente

1. Criar um arquivo .env na pasta backend, seguindo o padrao descrito no arquivo .env.example.

2. Dentro da pasta backend, executar p comando:

```sh
docker compose up -d
```

3. Em seguida executar as migrations com o comando:

```sh
npm run migration:run
```

4. Para popular o banco com um usuario de teste e uma lista pre-cadastrada de produtos(Essa opção é opcional porem util para testar o funcionamento da aplicação), executar o comando:

```sh
npm run seed:run
```

### Executar Frontend

1. Executar o comando:

```sh
npm i
```

Para instalar as dependencias do projeto.

2. Para executar a aplicação em modo de desenvolvedor:

```sh
npm run dev
```

3. A aplicação estara disponivel em "http://localhost:5173/". Caso tenha executado o passo 4 da sessão de ambiente, o sistema ja terá um usuario pre cadastrado no qual poderá realizar o login utilizando os seguintes dados de autenticação.

```sh
E-mail: user@example.com
Senha: example123
```
