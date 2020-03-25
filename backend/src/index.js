/**
 * Start
 * node index.js, 
 * ou depois de instalar o nodemon e configurar o package.json, npm start
 */

const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
// definir que a aplicação trabalha com JSON no corpo das requisições
app.use(express.json());
// definir que a aplicação ira usar as rotas definidas na variável routes
app.use(routes);

/**
 * Bando de dados
 * SQLite com Knex Query Builder
 * Inicializar Knex: npx knex init
 */

app.listen(3333);