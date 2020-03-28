/**
 * Bando de dados
 * SQLite com Knex Query Builder
 * Inicializar Knex: npx knex init
 */
const knex = require('knex');
const configuration = require('../../knexfile');

// acessa a varíavel de ambiente que foi definida no package.json
// quando ela for test (npm test) a configuração knex utilizada será a test
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config);

module.exports = connection;