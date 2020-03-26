const dbConnection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await dbConnection('incidents').count();

        const data = await dbConnection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(10)
            .offset((page - 1) * 10)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        res.header('X-Total-Count', count['count(*)']);
        return res.json(data);
    },

    async store(req, res) {
        const { title, description, value } = req.body;
        const ong_id =  req.headers.authorization;

        const [ id ] = await dbConnection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return res.json({id});
    },

    async delete(req, res) {
        const ong_id =  req.headers.authorization;
        const { id } = req.params;
        const incident = await dbConnection('incidents').select('ong_id').where({id}).first();

        if(incident) {
            if(incident.ong_id === ong_id) {
                await dbConnection('incidents').delete().where({id});
                return res.status(204).send();
            } else {
                return res.status(401).json({Error: "Operation not permitted"});
            }
        } else {
            return res.status(401).json({Error: "Invalid id"});
        }    
    }
}