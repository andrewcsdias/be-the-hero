const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;
        // gera um id único
        const id = generateUniqueId();

        await connection('ongs').insert({
            id, name, email, whatsapp, city, uf
        });

        return response.json({
            id
        });
    },

    async index(request, response){
        const ongs = await connection('ongs').select('*');

        return response.json({
            ongs
        });
    },

    async deleteAll(request, response){
        //await connection('ongs').del();

        return response.json({
            status: "disabled"
        });
    },

    async delete(request, response){
        const id = request.params; //retorna um objeto {id: 'valor_id'}

        await connection('ongs').where(id).del();

        return response.json({
            status: "deleted"
        });
    }
};