// test/server.test.js
const request = require('supertest');
const app = require('../server');
const axios = require('axios');
jest.mock('axios');

describe('API Endpoints', () => {
    it('should fetch holidays successfully', async () => {
        const mockData = {
            response: {
                holidays: [{ date: '2024-01-01', name: "New Year's Day" }]
            }
        };
        axios.get.mockResolvedValue({ data: mockData });

        const response = await request(app).get('/holidays?country=US&year=2024');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData.response.holidays);
    });

    it('should handle errors from Calendarific API', async () => {
        axios.get.mockRejectedValue({
            response: {
                status: 500,
                data: 'API Error'
            }
        });

        const response = await request(app).get('/holidays?country=US&year=2024');
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Error fetching data from Calendarific API' });
    });

    it('should return cached data for /countries endpoint', async () => {
        const mockData = [{ code: 'US', name: 'United States' }];
        axios.get.mockResolvedValue({ data: { response: { countries: mockData } } });

        const response = await request(app).get('/countries');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData);
    });
});
