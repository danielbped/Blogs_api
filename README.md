# Projeto [Blogs API](https://github.com/tryber/sd-012-project-blogs-api/pull/9)
  - Módulo 3: Desenvolvimento Back-end
    - Bloco 29: Arquitetura: SOLID e ORM

- Trata-se de um projeto com o objetivo de simular um Blog, podendo criar usuários, fazer login, criar categorias de posts, criar posts, atualizá-los, deletá-los, buscá-los por id, por texto em seu título ou em seu conteúdo, e muito mais

### Tecnologias utilizadas
- **Node JS**;
- **Express**;
- **MySQL**;
- **Sequelize**, para gerenciar as requisições ao banco de dados;
- **Json Web Token**, para proteger as rotas;
- **Bcrypt**, para encriptografar as senhas, antes de guardá-las no banco de dados;
- **Https Status Code**, para padronizar as respostas de acordo com a requisição;
- **Nodemon**, para facilitar a realização dos testes durante o desenvolvimento;
- **Insomnia**, para realizar os testes das rotas.

# Instruções para rodar o projeto

### Será necessário ter instalado na sua máquina:
      Postman ou Insomnia
      MySQL
      Node v16.13.0
      
  - Clone o repositório com o comando **git clone**:
  
        git clone git@github.com:danielbped/Blogs_api.git
  
  - Entre no diretório que acabou de criar:

        cd Blogs_api
        
  - Para o projeto funcionar na sua máquia, será necessário instalar suas dependências, para isso, utilize **npm install**:

        npm install

  - Na raiz do projeto, será necessário criar um arquivo **.env**, com as seguintes informações:

        MYSQL_USER=root
        MYSQL_PASSWORD=password
        HOSTNAME=localhost
        SECRET=secret
  
  `Lembre de trocar 'root' pelo seu nome de usuário no MySQL, e 'password' pela sua senha`

  - Pronto, agora o projeto está pronto para ser rodado localmente, utilizando o comando **npm start**:

        npm start

  `A aplicação, por definição, estará rodando na porta 3000`

# REST API

## Users

### POST /user

### Request
  - Para criar um novo usuário, o corpo da requisição deve ser no formato **JSON**, no seguinte modelo:

        {
          "displayName": "Ayrton senna",
          "email": "ayrtonsenna@gmail.com",
          "password": "123456",
          "image": "https://www.ibraco.org.co/wp-content/uploads/2021/10/ayrton.jpg"
        }

### Response
   - A resposta será um token, com um status 201 (**CREATED**), parecido com esse:

`
ATENÇÃO: Esse token, ou o de Login, será necessário para as demais requisições! Ele tem a validade de UMA HORA.
`            
     
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYXlydG9uc3Nlbm5hc2RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkOEZCN1g5SGFJZ1BxT3RYcXZDaVRVZUtxOG5LU3pLMVEzb3VuZHhmTVMxUERGUUdXcDlCb1MifSwiaWF0IjoxNjQxOTk2MzE2LCJleHAiOjE2NDE5OTk5MTZ9.T8DzqrCgVclWXtDds5u2rlH80q3maQN5NH6pwy3iIV4"
    }

- Caso alguma informação no corpo da requisição esteja em um formato indesejado, algumas mensagens de erro podem surgir:
  - Status 400 (**BAD REQUEST**):
    - **"displayName" length must be at least 8 characters long** (Caso o campo "displayName" tenha menos de 8 caracteres);
    - **"email" is required** (Caso o campo "email" esteja vazio);
    - **"email" must be a valid email** (Caso o campo "email" esteja em um formato não aceitável);
    - **"password" length must be 6 characters long** (Caso o campo "password" tenha menos ou mais de 6 caracteres);
    - **"password" is required** (Caso o campo "password" esteja vazio).
  - Status 409 (**CONFLICT**):
    - **User already registered** (Caso um usuário com o email informado já exista no banco de dados).

### POST /login

### Request
- Para realizar o login, o corpo da requisição deve ser no formato **JSON**, no seguinte modelo:

        {
          "email": "ayrtonsenna@gmail.com",
          "password": "123456",
        }

### Response
 - A resposta será um token, com um status 200 (**OK**), parecido com esse:

        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibGV3aXNoYW1pbHRvbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NiJ9LCJpYXQiOjE2NDE5MTE1NjIsImV4cCI6MTY0MTkxNTE2Mn0.P1BFey7VY0aKhEEy2zbTg_zmQ1yyDE3XwKdjEqW0uEk"
        }

- Caso alguma informação no corpo da requisição esteja em um formato indesejado, algumas mensagens de erro podem surgir:
  - Status 400 (**BAD REQUEST**):
    - **"email" is required** (Caso o campo "email" não esteja presente);
    - **"email" is not allowed to be empty** (Caso o campo "email" esteja vazio);
    - **"password" is required** (Caso o campo "password" esteja vazio);
    - **Invalid fields** (Caso o campo "email" ou "password" esteja em um formato indesejável);
    - **User does not exist** (Caso o usuário não esteja cadastrado);
    - **Wrong password** (Caso a senha não esteja correta).

### GET /user

### Request
- Para realizar a busca de todos os usuários cadastrados, **será necessário utilizar o token obtido no login ou no cadastro**, e a requisição não terá corpo. O token será utilizado no header **"authorization"** da requisição.

### Response
- A resposta terá um status 200 (**OK**), e será um array parecido com o seguinte:

      [
        {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        {
          "id": 2,
          "displayName": "Michael Schumacher",
          "email": "MichaelSchumacher@gmail.com",
          "image": "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
        }
      ]

- Caso haja algum problema com o token informado, algumas mensagens de erro podem surgir:
  - Status 401 (**UNAUTHORIZED**):
    - **Expired or invalid token** (Caso o token seja inválido ou já tenha expirado);
    - **Token not found** (Caso o header "authorization" esteja vazio).

### GET /user/:id

### Request

- Para realizar a busca de um usuário cadastrado pelo "id", **será necessário utilizar o token obtido no login ou no cadastro**, e a requisição não terá corpo. O token será utilizado no header **"authorization"** da requisição.

### Response

- A resposta terá um status 200 (**OK**), e será parecida com a seguinte (Ex.: user/1):

      {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      }


- Caso haja algum problema com a requisição, algumas mensagens de erro podem surgir:
  - Status 401 (**UNAUTHORIZED**):
    - **Expired or invalid token** (Caso o token seja inválido ou já tenha expirado);
    - **Token not found** (Caso o header "authorization" esteja vazio).
  - Status 404 (**NOT FOUND**):
    - **User does not exist** (Caso não haja um usuário com o id informado).

### DELETE user/me

### Request

- Para deletar seu próprio cadastro, **será necessário utilizar o token obtido no login ou no cadastro, e que o token seja do mesmo usuário que deseja deletar**, e a requisição não terá corpo. O token será utilizado no header **"authorization"** da requisição.

### Response

- A resposta terá um status 204 (**NO CONTENT**), e não terá corpo.

- Caso haja algum problema com o token informado, algumas mensagens de erro podem surgir:
  - Status 401 (**UNAUTHORIZED**):
    - **Expired or invalid token** (Caso o token seja inválido ou já tenha expirado);
    - **Token not found** (Caso o header "authorization" esteja vazio).

## Categories

### POST /categories

### Request

- Para adicionar uma categoria, será necessário estar logado, e utilizar o token no header **"authorization"** da requisição, e o corpo da requisição terá o formato **JSON**, no seguinte modelo:

      {
        "name": "filmes"
      }

### Response

- A resposta terá um status 201 (**CREATED**), e deverá ser parecida com a seguinte:

      {
        "id": 1,
        "name": "filmes"
      }

- Caso haja algum problema com a requisição, algumas mensagens de erro podem surgir:
    - Status 400 (**BAD REQUEST**):
      - **"name" is required** (Caso o campo "name" não esteja presente ou esteja vazio)
    - Status 401 (**UNAUTHORIZED**):
      - **Expired or invalid token** (Caso o token seja inválido ou já tenha expirado)
      - **Token not found** (Caso o header "authorization" esteja vazio)

### GET /categories

### Request

- Para realizar a busca de todas as categorias cadastradas, **será necessário utilizar o token obtido no login ou no cadastro**, e a requisição não terá corpo, o token será informado no header **"authorization"** da requisição.

### Response

- A resposta terá um status 200 (**OK**), e será um array parecido com o seguinte:

      [
        {
          "id": 1,
          "name": "filmes"
        },
        {
          "id": 2,
          "name": "esportes"
        }
      ]

- Caso haja algum problema com o token informado, algumas mensagens de erro podem surgir:
  - Status 401 (**UNAUTHORIZED**):
    - **Expired or invalid token** (Caso o token seja inválido ou já tenha expirado);
    - **Token not found** (Caso o header "authorization" esteja vazio).

## Posts

### POST /post

### Request

- Para criar um novo post, **será necessário utilizar o token obtido no login ou no cadastro**, o token será informado no header **"authorization"** da requisição,e a requisição deverá ter um corpo no formato **JSON**, e seguir o seguinte modelo:

### Response

- A resposta terá um status 201 (**CREATED**), e será parecida com a seguinte:

      {
        "id": 1,
        "userId": 1,
        "title": "Latest updates, August 1st",
        "content": "The whole text for the blog post goes here in this key"
      }

- Caso haja algum problema com a requisição, algumas mensagens de erro podem surgir:
  - Status 400 (**BAD REQUEST**):
    - **"title" is required** (Caso o campo "title" esteja vazio ou não esteja presente);
    - **"content"  is required** (Caso o campo "content" esteja vazio ou não esteja presente);
    - **"categoryIds" is required** (Caso o campo "categoryIds" esteja vazio ou não esteja presente);
    - **"categoryIds" not found** (Caso o id da categoria informado não pertença a nenhuma categoria cadastrada).
  - Status 401 (**UNAUTHORIZED**):
      - **Expired or invalid token** (Caso o token seja inválido ou já tenha expirado);
      - **Token not found** (Caso o header "authorization" esteja vazio).

### GET /post

### Request

- Para realizar a busca de todos os posts cadastrados, **será necessário utilizar o token obtido no login ou no cadastro**, e a requisição não terá corpo, o token será informado no header **"authorization"** da requisição.

### Response

- A resposta terá um status 200 (**OK**), e será um array parecido com o seguinte:

      [
        {
          "id": 1,
          "title": "Latest updates, August 1st",
          "content": "The whole text for the blog post goes here in this key",
          "userId": 1,
          "updated": "2022-01-12T15:30:12.000Z",
          "published": "2022-01-12T15:30:12.000Z",
          "user": {
            "id": 1,
            "displayName": "Ayrton senna",
            "email": "ayrtonsenna@gmail.com",
            "image": "https://www.ibraco.org.co/wp-content/uploads/2021/10/ayrton.jpg"
          }
        },
        {
          "id": 2,
          "title": "Latest updates, August 12st",
          "content": "The whole text for the blog post goes here in this key",
          "userId": 1,
          "updated": "2022-01-12T15:36:29.000Z",
          "published": "2022-01-12T15:36:29.000Z",
          "user": {
            "id": 1,
            "displayName": "Ayrton senna",
            "email": "ayrtonsenna@gmail.com",
            "image": "https://www.ibraco.org.co/wp-content/uploads/2021/10/ayrton.jpg"
          }
        }
      ]
      
- Caso haja algum problema com o token informado, algumas mensagens de erro podem surgir:
  - Status 401 (**UNAUTHORIZED**):
    - **Expired or invalid token** (Caso o token seja inválido ou já tenha expirado);
    - **Token not found** (Caso o header "authorization" esteja vazio).

### GET /post/:id

### Request

- Para realizar a busca de um post cadastrado por "id", **será necessário utilizar o token obtido no login ou no cadastro**, e a requisição não terá corpo, o token será informado no header **"authorization"** da requisição.

### Response

- A resposta terá um status 200 (**OK**), e será parecida com a seguinte (Ex.: post/1):

      {
        "id": 1,
        "title": "Latest updates, August 1st",
        "content": "The whole text for the blog post goes here in this key",
        "userId": 1,
        "updated": "2022-01-12T15:30:12.000Z",
        "published": "2022-01-12T15:30:12.000Z",
        "user": {
          "id": 1,
          "displayName": "Ayrton senna",
          "email": "ayrtonsenna@gmail.com",
          "image": "https://www.ibraco.org.co/wp-content/uploads/2021/10/ayrton.jpg"
        }
      }

- Caso haja algum problema com a requisição, algumas mensagens de erro podem surgir:
  - Status 404 (**NOT FOUND**):
    - **Post does not exist** (Caso o "id" informado não pertença a nenhum post cadastrado).
  - Status 401 (**UNAUTHORIZED**):
    - **Expired or invalid token** (Caso o token seja inválido ou já tenha expirado);
    - **Token not found** (Caso o header "authorization" esteja vazio).

### PUT /post/:id

### Request

- Para editar um post cadastrado por "id", **será necessário utilizar o token obtido no login ou no cadastro, e o token deve ser do mesmo usuário que criou o post**, o token será informado no header **"authorization"** da requisição, e o corpo da requisição deve seguir o modelo a seguir (Ex.: post/1):

      {
        "title": "Edited",
        "content": "Edited"
      }

### Response

- A resposta terá um status 200 (**OK**), e será parecida com a seguinte:

      {
        "title": "Edited",
        "content": "Edited",
        "userId": 1
      }
      
- Caso haja algum problema com a requisição, algumas mensagens de erro podem surgir:
  - Status 400 (**BAD REQUEST**):
    - **Categories cannot be edited** (Caso tente alterar as categorias do post);
    - **"title" is required** (Caso o campo "title" esteja vazio);
    - **"content" is required** (Caso o campo "content" esteja vazio).
  - Status 401 (**UNAUTHORIZED**):
    - **Unauthorized user** (Caso o token informado seja de outro usuário;) 
    - **Expired or invalid token** (Caso o token seja inválido ou já tenha expirado);
    - **Token not found** (Caso o header "authorization" esteja vazio).

### DELETE /post/:id

### Request

- Para deletar um post cadastrado por "id", **será necessário utilizar o token obtido no login ou no cadastro, e o token deve ser do mesmo usuário que criou o post**, o token será informado no header **"authorization"** da requisição, e o corpo da requisição deve seguir o modelo a seguir (Ex.: post/1):

### Response

- A resposta terá um status 204 (**NO CONTENT**), e não terá corpo.

- Caso haja algum problema com a requisição, algumas mensagens de erro podem surgir:
  - Status 404 (**NOT FOUND**):
    - **Post does not exist** (Caso o "id" informado não pertença a nenhum post cadastrado).
  - Status 401 (**UNAUTHORIZED**):
    - **Unauthorized user** (Caso o token informado seja de outro usuário;) 
    - **Expired or invalid token** (Caso o token seja inválido ou já tenha expirado);
    - **Token not found** (Caso o header "authorization" esteja vazio).

### GET /post/search?q=searchTerm

### Request

- Para buscar um post pelo conteúdo em seu campo "title" ou em seu campo "content", **será necessário utilizar o token obtido no login ou no cadastro**, e a requisição não terá corpo, o token será informado no header **"authorization"** da requisição.

### Response

- A terá status 200 (**OK**), e a resposta será um array, com os posts que combinam com a busca, parecido com o modelo a seguir (Ex.: /post/search?q=latest):

      [
        {
          "id": 1,
          "title": "Latest updates, August 1st",
          "content": "The whole text for the blog post goes here in this key",
          "userId": 1,
          "updated": "2022-01-12T15:30:12.000Z",
          "published": "2022-01-12T15:30:12.000Z",
          "user": {
            "id": 1,
            "displayName": "Ayrton senna",
            "email": "ayrtonsenna@gmail.com",
            "image": "https://www.ibraco.org.co/wp-content/uploads/2021/10/ayrton.jpg"
          }
        },
        {
          "id": 2,
          "title": "Latest updates, August 12st",
          "content": "The whole text for the blog post goes here in this key",
          "userId": 1,
          "updated": "2022-01-12T15:36:29.000Z",
          "published": "2022-01-12T15:36:29.000Z",
          "user": {
            "id": 1,
            "displayName": "Ayrton senna",
            "email": "ayrtonsenna@gmail.com",
            "image": "https://www.ibraco.org.co/wp-content/uploads/2021/10/ayrton.jpg"
          }
        }
      ]

- Caso nenhum post combine com a busca, o array virá vazio.

- Caso haja algum problema com o token informado, algumas mensagens de erro podem surgir:
  - Status 401 (**UNAUTHORIZED**):
    - **Expired or invalid token** (Caso o token seja inválido ou já tenha expirado);
    - **Token not found** (Caso o header "authorization" esteja vazio).

## Requisitos
O projeto foi desenvolvido seguindo requisitos pré-estabelecidos:
- [x] Sua aplicação deve ter o endpoint POST `/user`
- [x] Sua aplicação deve ter o endpoint POST `/login`
- [x] Sua aplicação deve ter o endpoint GET `/user`
- [x] Sua aplicação deve ter o endpoint GET `/user/:id`
- [x] Sua aplicação deve ter o endpoint POST `/categories`
- [x] Sua aplicação deve ter o endpoint GET `/categories`
- [x] Sua aplicação deve ter o endpoint POST `/post`
- [x] Sua aplicação deve ter o endpoint GET `/post`
- [x] Sua aplicação deve ter o endpoint GET `post/:id`
- [x] Sua aplicação deve ter o endpoint PUT `/post/:id`

### Bônus
- [x] Sua aplicação deve ter o endpoint DELETE `post/:id`
- [x] Sua aplicação deve ter o endpoint DELETE `/user/me`
- [x] Sua aplicação deve ter o endpoint GET `post/search?q=:searchTerm`
