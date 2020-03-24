const dbConnection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const ong_id =  req.headers.authorization;
        const data = await dbConnection('incidents').select('*').where({ong_id});

        return res.json(data);
    },
}