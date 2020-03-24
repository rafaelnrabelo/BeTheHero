const dbConnection = require('../database/connection');

module.exports = {
    async login(req, res) {
        const { id } = req.body;
        const auth = await dbConnection('ongs').select('name').where({id}).first();

        if(!auth) {
            res.status(400).json({Error: "No ONG found with this ID"})
        }
        return res.json(auth);
    },
}