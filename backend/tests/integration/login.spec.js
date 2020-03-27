const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to login', async () => {
        const ongResponse = await request(app).post('/ongs').send({
            name: "ONG Teste",
            email: "teste@ong.com",
            whatsapp: "37000000000",
            city: "Divinópolis",
            uf: "MG"
        });

        id = ongResponse.body.id;

        const response = await request(app).post('/sessions').send({ id });

        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe('ONG Teste');
    });
})