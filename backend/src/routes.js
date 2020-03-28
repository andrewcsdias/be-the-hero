const express = require('express');

// celabrate validator (middleware)
const { celebrate, Joi, Segments } = require('celebrate');

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
// Inserir ONG - validate with celebrate
routes.post('/ongs', 
    celebrate({
        // para usar variável como chave do objeto: []
        // validar o body da requisição com celebrate
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required().min(10).max(11),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2)
        })
    }), 
    async (request, response) => {
        return OngController.create(request, response); // (apenas outra forma de fazer)
    }
);
// Deletar todas as ONGs
routes.delete('/ongs', OngController.deleteAll);
// Deletar uma ONG
routes.delete('/ongs/:id', OngController.delete);

/**
 * Rotas Casos
 */
// Listar Casos
routes.get('/incidents', 
    celebrate({
        // validar query params
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        })
    }),
    IncidentController.index
);
// Inserir Caso
routes.post('/incidents', IncidentController.create);
// Deletar todos os Casos
routes.delete('/incidents', IncidentController.deleteAll);
// Deletar um Caso
routes.delete('/incidents/:id', 
    celebrate({
        // validar params
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
        // validação de headers vai no object() e não há keys(),
        // pois podem haver outros headers que não estamos esperando, logo não podemos validar
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown()
    }),
    IncidentController.delete
);

/**
 * Rotas Profile ONG
 */
routes.get('/profile', 
    celebrate({
        // validação de headers vai no object() e não há keys(),
        // pois podem haver outros headers que não estamos esperando, logo não podemos validar
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown()
    }),
    ProfileController.index
);

module.exports = routes;