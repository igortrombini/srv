# Resumo das Funções e Utilitários

## Funções de Controle de Imóveis

### `createImobi(request, response)`
- Cria um novo imóvel no banco de dados.
- Realiza upload de imagem para a Amazon S3.
- Verifica a existência do usuário relacionado ao imóvel.
- Normaliza o tipo do imóvel para gerar um slug.
- Retorna o imóvel criado com sucesso ou uma mensagem de erro.

### `findAllImobi(request, response)`
- Retorna todos os imóveis cadastrados no banco de dados.

### `findImobi(request, response)`
- Busca um imóvel específico pelo slug.
- Retorna o imóvel encontrado ou uma mensagem de erro.

## Funções de Controle de Mensagens

### `createMessage(request, response)`
- Cria uma nova mensagem de usuário para anunciante.
- Verifica se a mensagem já foi cadastrada previamente.
- Retorna a mensagem criada com sucesso ou uma mensagem de erro.

### `findMessage(request, response)`
- Busca todas as mensagens relacionadas a um usuário.
- Retorna as mensagens encontradas ou uma mensagem de erro.

## Funções de Controle de Usuários

### `createUser(request, response)`
- Cria um novo usuário no banco de dados.
- Verifica se o usuário já existe.
- Retorna o usuário criado com sucesso ou uma mensagem de erro.

### `findAllUser(request, response)`
- Retorna todos os usuários cadastrados no banco de dados.

### `findUser(request, response)`
- Busca um usuário específico pelo ID.
- Retorna o usuário encontrado ou uma mensagem de erro.

## Middleware de Autenticação

### `auth(request, response, next)`
- Middleware para verificar a autenticação do usuário.
- Utiliza JWT para verificar o token de autenticação.
- Define o ID do usuário autenticado na requisição.
- Retorna uma mensagem de erro se a autenticação falhar.

## Utilitários e Serviços

### `UploadImagesService`
- Serviço para realizar upload de imagens.
- Utiliza o serviço S3 da Amazon para armazenamento.
- Retorna uma mensagem de erro em caso de falha no upload.

### `DeleteImagesService`
- Serviço para exclusão de imagens.
- Não implementado no resumo fornecido.

### `S3storage`
- Classe para manipulação de armazenamento na Amazon S3.
- Realiza upload de arquivos para o bucket especificado.
- Exclui o arquivo local após upload bem-sucedido.

## Configurações e Outros

### `uploadConfig`
- Configurações de upload de arquivos com Multer.
- Define o diretório temporário para armazenamento de arquivos.

### `router`
- Definição das rotas da aplicação utilizando o express.Router().
- Configura as rotas para os controladores e middlewares.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução de código JavaScript do lado do servidor.
- **Express**: Framework web para construção de APIs RESTful.
- **Prisma**: ORM para acesso ao banco de dados PostgreSQL.
- **Multer**: Middleware para upload de arquivos.
- **AWS SDK**: SDK para interagir com os serviços da Amazon Web Services.
- **JWT**: JSON Web Tokens para autenticação de usuários.

## Como Usar

1. Clone o repositório para sua máquina local.
2. Instale as dependências usando `npm install`.
3. Configure as variáveis de ambiente conforme necessário.
4. Execute o servidor utilizando `npm start`.
5. Acesse as rotas da API conforme definido no arquivo `router.js`.
