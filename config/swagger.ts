import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import 'dotenv/config';
// Carrega o package.json como um objeto
const { name, version, description } = require('../package.json');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: name || 'WeFit API',
    version: version || '1.0.0',
    description: description || 'API para gerenciamento de usuários',
  },
  servers: [
    {
      url: `${process.env.BASE_URL_API || 'localhost'}:${process.env.PORT || 4568}`,
      description: 'Local development server',
    },
  ],
  paths: {
    '/users': {
      post: {
        summary: 'Cria um novo usuário',
        tags: ['Users'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserData',
              },
              example: {
                personType: 'JURIDICA',
                cnpj: '12345678000195',
                cpf: '12345678909', // Note que CPF é opcional para JURIDICA, mas pode ser incluído como exemplo
                full_name: 'Empresa Exemplo LTDA',
                mobile: '+55 11 91234-5678',
                phone: '+55 11 4321-8765',
                email: 'contato@empresaexemplo.com',
                zip_code: '12345678',
                street: 'Rua das Flores',
                number: '123',
                complement: 'Sala 101',
                city: 'São Paulo',
                neighborhood: 'Centro',
                state: 'SP',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Usuário criado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          '400': {
            description: 'Erro de validação ou duplicata',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      UserData: {
        type: 'object',
        properties: {
          personType: { type: 'string', enum: ['FISICA', 'JURIDICA'], nullable: true },
          cnpj: { type: 'string', nullable: true, maxLength: 14 },
          cpf: { type: 'string', nullable: true, maxLength: 11 },
          full_name: { type: 'string', maxLength: 255 },
          mobile: { type: 'string', maxLength: 20 },
          phone: { type: 'string', nullable: true, maxLength: 20 },
          email: { type: 'string', maxLength: 255 },
          zip_code: { type: 'string', maxLength: 10 },
          street: { type: 'string', maxLength: 255 },
          number: { type: 'string', maxLength: 10 },
          complement: { type: 'string', nullable: true, maxLength: 255 },
          city: { type: 'string', maxLength: 100 },
          neighborhood: { type: 'string', maxLength: 100 },
          state: { type: 'string', maxLength: 2 },
        },
        required: ['personType', 'full_name', 'mobile', 'email', 'zip_code', 'street', 'number', 'city', 'neighborhood', 'state'],
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          personType: { type: 'string', enum: ['FISICA', 'JURIDICA'], nullable: true },
          cnpj: { type: 'string', nullable: true, maxLength: 14 },
          cpf: { type: 'string', nullable: true, maxLength: 11 },
          full_name: { type: 'string', maxLength: 255 },
          mobile: { type: 'string', maxLength: 20 },
          phone: { type: 'string', nullable: true, maxLength: 20 },
          email: { type: 'string', maxLength: 255 },
          zip_code: { type: 'string', maxLength: 10 },
          street: { type: 'string', maxLength: 255 },
          number: { type: 'string', maxLength: 10 },
          complement: { type: 'string', nullable: true, maxLength: 255 },
          city: { type: 'string', maxLength: 100 },
          neighborhood: { type: 'string', maxLength: 100 },
          state: { type: 'string', maxLength: 2 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['id', 'full_name', 'mobile', 'email', 'zip_code', 'street', 'number', 'city', 'neighborhood', 'state'],
      },
    },
  },
};

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};