# API com Hapi.js

Esta é uma API simples construída com Node.js, Hapi.js e Sequelize.

## Instalação

Para instalar esta aplicação, basta clonar o repositório e instalar as dependências:

### `npm install`

## Configuração

Antes de executar a aplicação, é necessário configurar as variáveis de ambiente. Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis:

### `DB_HOST=localhost`
### `DB_USER=seu-usuario`
### `DB_PASSWORD=sua-senha`
### `DB_NAME=minha-api`
### `SECRET_KEY=minha-chave-secreta`

## Uso

Para executar a aplicação, basta rodar o seguinte comando:

### `npm run dev`

A API estará disponível em http://localhost:3000.

## Rotas

A API possui as seguintes rotas:

POST /users - Cria um novo usuário.\
POST /users/authenticate - Autentica um usuário existente.\
GET /users - Lista todos os usuários.\
GET /users/{id} - Retorna um usuário específico.\
PUT /users/{id} - Atualiza um usuário existente.\
DELETE /users/{id} - Remove um usuário existente.

Cada rota possui seus próprios parâmetros e requisitos, que devem ser documentados adequadamente. Consulte o código-fonte da aplicação para obter mais detalhes.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou relatar problemas.
