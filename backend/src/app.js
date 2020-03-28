/**
 * Start
 * node index.js, 
 * ou depois de instalar o nodemon e configurar o package.json, npm start
 */

const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();

app.use(cors());
// definir que a aplicação trabalha com JSON no corpo das requisições
app.use(express.json());
// definir que a aplicação ira usar as rotas definidas na variável routes
app.use(routes);
// usar o tratamento de erros do celebrate
app.use(errors());

module.exports = app;