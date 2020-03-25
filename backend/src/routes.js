const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/*
    -- Rotas - Tipos de parâmatros --
    Query params (request.query): parâmatros nomeados enviados após ?, ?name="banana"
    Route params (request.params): parâmetros utilizados para identificar recurso, :id
    Request body (request.query): corpo da requisição, usado para criar/alterar recursos 
*/

/**
 * Rota de login
 */
routes.post('/sessions', SessionController.create);

/**
 * Rotas ONGs
 */
// Listar ONGs
routes.get('/ongs', OngController.index);
// Inserir ONG
routes.post('/ongs', async (request, response) => {
    return OngController.create(request, response); // (apenas outra forma de fazer)
});
// Deletar todas as ONGs
routes.delete('/ongs', OngController.deleteAll);
// Deletar uma ONG
routes.delete('/ongs/:id', OngController.delete);

/**
 * Rotas Casos
 */
// Listar Casos
routes.get('/incidents', IncidentController.index);
// Inserir Caso
routes.post('/incidents', IncidentController.create);

// Deletar todos os Casos
routes.delete('/incidents', IncidentController.deleteAll);
// Deletar um Caso
routes.delete('/incidents/:id', IncidentController.delete);

/**
 * Rotas Profile ONG
 */
routes.get('/profile', ProfileController.index);

module.exports = routes;