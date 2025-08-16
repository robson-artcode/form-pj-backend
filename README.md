# form-pj-backend

O form-pj-backend é uma aplicação backend desenvolvida em Node.js com TypeScript, utilizando o framework Express e o ORM Sequelize para gerenciamento de usuários. Esta API permite criar e retornar usuários (pessoa física ou jurídica) com validações robustas e documentação Swagger integrada.

## Requisitos

- Node.js (versão 16.x ou superior recomendada)
- npm (geralmente incluído com o Node.js)

## Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/robson-artcode/form-pj-backend.git
   cd form-pj-backend
   ```

2. **Configure as variáveis de ambiente**:

Renomeie o arquivo .env.example para .env e ajuste os valores conforme necessário (ex.: porta, URL do banco de dados, etc.).
Exemplo de .env:

```bash
PORT=3333
BASE_URL_API=http://localhost

MYSQLDB_PASSWORD=sua_senha
MYSQLDB_PORT=3333
MYSQLDB_DATABASE=nome_do_banco
```

3. **Execute o setup**:

Rode o comando abaixo para instalar as dependências e configurar o banco de dados:
```bash
npm run setup
```
Este comando executa npm install para instalar as dependências e aplica as migrações do Sequelize para criar as tabelas necessárias.

**Opcional - Uso da pasta "data"**:
- Descompacte o arquivo data.zip na raiz do projeto (enviado por e-mail). Este arquivo contém o banco de dados que foi criado e testado durante os testes.

4. **Inicie o servidor**:

Após o setup, inicie a aplicação com:
```bash 
npm start
```
O servidor estará disponível em http://localhost:3333.


## Uso
### Endpoints
A documentação interativa da API está disponível em:
text http://localhost:3333/api-docs

### Criar um usuário: POST /users

Exemplo de payload:
```bash 
{
  "personType": "JURIDICA",
  "cnpj": "12345678000195",
  "full_name": "Empresa Exemplo LTDA",
  "mobile": "+55 11 91234-5678",
  "email": "contato@empresaexemplo.com",
  "zip_code": "12345678",
  "street": "Rua das Flores",
  "number": "123",
  "city": "São Paulo",
  "neighborhood": "Centro",
  "state": "SP"
}
```

Exemplo de resposta:
```bash
{
	"id": 1,
	"personType": "JURIDICA",
	"cnpj": "12345678000195",
	"cpf": "12345678909",
	"full_name": "Empresa Exemplo LTDA",
	"mobile": "+55 11 91234-5678",
	"phone": "+55 11 4321-8765",
	"email": "contato@empresaexemplo.com",
	"zip_code": "12345678",
	"street": "Rua das Flores",
	"number": "123",
	"complement": "Sala 101",
	"city": "São Paulo",
	"neighborhood": "Centro",
	"state": "SP",
	"updatedAt": "2025-08-16T00:34:01.276Z",
	"createdAt": "2025-08-16T00:34:01.276Z"
}
```

## Estrutura do Projeto
```bash
form-pj-backend/
├── config/              # Configurações (ex.: Swagger)
├── src/                 # Código fonte
│   ├── database.ts      # Configuração do Sequelize
│   ├── index.ts         # Ponto de entrada da aplicação
│   ├── modules/         # Módulos da aplicação (ex.: users)
│   └── utils/           # Utilitários (ex.: validadores)
├── migrations/          # Migrações do Sequelize
├── .env.example         # Exemplo de variáveis de ambiente
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração do TypeScript
└── README.md            # Este arquivo
```