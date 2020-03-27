const dbConnection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async index(req, res) {
        const data = await dbConnection('ongs').select('*');

        return res.json(data);
    },

    async store(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
        const id = generateUniqueId();

        await dbConnection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return res.json({id});
    }
}