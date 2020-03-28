const request = require('supertest'); // requisições http para testes (não usar axios)
const app = require('../../src/app'); // testes utilizamos app.js, mas não server.js
const connection = require('../../src/database/connection');

describe('ONG', () => {
    // antes de cada teste executar as migrations no banco teste
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    // depois de todos os teste, fecha a conexão
    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        // insere a ong via supertest request
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "ONG Teste X",
            email: "ongx@email.com.br",
            whatsapp: "34966669999",
            city: "City X",
            uf: "XX"
        });

        // executa as validações do test
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});
