const request = require('supertest');
const db = require('../../../database/dbConfig');
const server = require('../../server');
const jwt = require('jsonwebtoken');

describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
})

// GET all trucks object
describe('GET /', () => {
    it('should retrieve a list of trucks', async () => {
        let res = await request(server)
            .get('/trucks')
            .set('Accept', 'application/json')
        expect(res.status).toBe(200);
    })
})

// Get trucks by ID
describe('GET /trucks/:id', () => {
    it('should retrieve a list of trucks', async () => {
        let res = await request(server)
            .get('/trucks/1')
            .set('Accept', 'application/json')
        expect(res.status).toBe(200);
    })
})