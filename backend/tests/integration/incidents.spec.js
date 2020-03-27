const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG',() => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new Incident', async () => {
        const ongResponse = await request(app).post('/ongs').send({
            name: "ONG Teste",
            email: "teste@ong.com",
            whatsapp: "37000000000",
            city: "Divinópolis",
            uf: "MG"
        });
    
        const id = ongResponse.body.id;

        const response = await request(app).post('/incidents').set('Authorization', id).send({
            title: "Incidente Teste",
            description: "Descrição teste",
            value: "150"
        });

        expect(response.body).toHaveProperty('id');
    });

    it('should be able to list the Incidents', async () => {

        const response = await request(app).get('/incidents');

        expect(response.body[0]).toHaveProperty('id');

        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0].title).toBe('Incidente Teste');

        expect(response.body[0]).toHaveProperty('description');
        expect(response.body[0].description).toBe('Descrição teste');

        expect(response.body[0]).toHaveProperty('value');
        expect(response.body[0].value).toBe(150);

        expect(response.body[0]).toHaveProperty('ong_id');

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

    it('should be able to list the Incidents from a specific ONG', async () => {

        const ongResponse = await request(app).post('/ongs').send({
            name: "ONG Teste",
            email: "teste@ong.com",
            whatsapp: "37000000000",
            city: "Divinópolis",
            uf: "MG"
        });
    
        const id = ongResponse.body.id;

        await request(app).post('/incidents').set('Authorization', id).send({
            title: "Incidente Teste",
            description: "Descrição teste",
            value: "150"
        });

        const response = await request(app).get('/profile').set('Authorization', id);

        expect(response.body[0]).toHaveProperty('id');

        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0].title).toBe('Incidente Teste');

        expect(response.body[0]).toHaveProperty('description');
        expect(response.body[0].description).toBe('Descrição teste');

        expect(response.body[0]).toHaveProperty('value');
        expect(response.body[0].value).toBe(150);

        expect(response.body[0]).toHaveProperty('ong_id');
    });

    it('should be able to delete a Incidents', async () => {

        const ongResponse = await request(app).post('/ongs').send({
            name: "ONG Teste",
            email: "teste@ong.com",
            whatsapp: "37000000000",
            city: "Divinópolis",
            uf: "MG"
        });
    
        const ongId = ongResponse.body.id;

        const incidentResponse = await request(app).post('/incidents').set('Authorization', ongId).send({
            title: "Incidente Teste",
            description: "Descrição teste",
            value: "150"
        });

        const id = incidentResponse.body.id;

        const response = await request(app).delete(`/incidents/${id}`).set('Authorization', ongId);
        
        expect(response.statusCode).toBe(204);
    });
})