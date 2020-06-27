const request = require('supertest');
const db = require('../../../database/dbConfig');
const server = require('../../server');

describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
})

// POST Operators register

describe('POST /register', () => {
    it('should register the user', async () => {
        let res = await request(server)
            .post('/auth/operator/register')
            .send({username: "jesusR_test", password: "password"})
            .set('Accept', 'application/json');
        expect(res.status).toBe(201);
    })

    it('should return 500 if username is missing', async () => {
        let res = await request(server)
            .post('/auth/operator/register')
            .send({username: "jesusR_test"})
            .set('Accept', 'application/json');
        expect(res.status).toBe(500);
    })

    it('should return 500 if password is missing', async () => {
        let res = await request(server)
            .post('/auth/operator/register')
            .send({username: "jesus_test", password: ""})
            .set('Accept', 'application/json');
        expect(res.status).toBe(500);
    })
})


// POST Operator Login 
describe('POST /login', () => {
    it('should log the user in', async () => {
        let res = await request(server)
            .post('/auth/operator/login')
            .send({username: "jesus_test", password: "password"})
            .set('Accept', 'application/json')
        expect(res.status).toBe(200);
    })

    it('should return status 401 if password is missing or incorrect', async () => {
        let res = await request(server)
            .post('/auth/operator/login')
            .send({username: "jesus_test", password: ""})
            .set('Accept', 'application/json')
        expect(res.status).toBe(401);
    })

    it('should return 500 if the username is missing', async () => {
        let res = await request(server)
            .post('/auth/operator/login')
            .send({username: "jesus_test"})
            .set('Accept', 'application/json')
        expect(res.status).toBe(500);
    })
})

beforeEach(async () => {
    await db('operators').truncate();
    await request(server)
        .post('/auth/operator/register')
        .send({username: "jesus_test", password: "password"})
        .set('Accept', 'application/json');
})



