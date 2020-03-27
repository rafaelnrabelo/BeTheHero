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

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "ONG Teste",
            email: "teste@ong.com",
            whatsapp: "37000000000",
            city: "Divinópolis",
            uf: "MG"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should be able to list all ONGs', async () => {

        const response = await request(app).get('/ongs');

        expect(response.body[0]).toHaveProperty('id');

        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0].name).toBe('ONG Teste');

        expect(response.body[0]).toHaveProperty('email');
        expect(response.body[0].email).toBe('teste@ong.com');

        expect(response.body[0]).toHaveProperty('whatsapp');
        expect(response.body[0].whatsapp).toBe("37000000000.0");

        expect(response.body[0]).toHaveProperty('city');
        expect(response.body[0].city).toBe('Divinópolis');

        expect(response.body[0]).toHaveProperty('uf');
        expect(response.body[0].uf).toBe('MG');
    });
})