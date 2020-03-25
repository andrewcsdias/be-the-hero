const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {title, description, value} = request.body;
        // Dados de login vão no Header da requisição
        const ong_id = request.headers.authorization;

        // retorno de um insert é o id dele, se houver
        const [id] = await connection('incidents').insert({
            title, description, value, ong_id
        });

        return response.json({
            resposta: "Caso Nº " + id + " inserido para ONG " + ong_id
        });
    },

    async index(request, response){
        const {page = 1} = request.query;
        const incidents_page = 5;

        //retorna um array, então usa-se [] para pegar direto a primeira posição
        const [count] = await connection('incidents').count('id');

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(incidents_page).offset((page - 1) * incidents_page)
            .orderBy('id')
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        // envia o total no header da resposta, usar `` no lugar de ''
        response.header('X-Total-Count', count['count(`id`)']);

        return response.json(incidents);
    },

    async deleteAll(request, response){
        //await connection('incidents').del();

        return response.json({
            status: "disabled"
        });
    },

    async delete(request, response){
        const {id} = request.params; //retorna o valor do id
        const ong_id = request.headers.authorization;

        // Verifica se a ONG que está tentando excluir o Caso e a que o criou
        const incident = await connection('incidents').where('id', id).select('ong_id').first();
        
        if(incident.ong_id != ong_id){
            // Retorno o erro com o status HTTP Unauthorized
            return response.status(401).json({
                error: "Opperation not permited."
            });
        }
        
        await connection('incidents').where('id',id).del();

        // Envia a resposta se nenhum conteúdo
        return response.status(204).send();

        /*return response.json({
            status: "deleted"
        });*/
    }
};