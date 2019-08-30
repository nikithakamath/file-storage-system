'use strict';

const app = require('../app');
const request = require('supertest');
const fs = require('fs');

describe('Tasks', () => {
  describe('POST /file', () => {
    it('should upload a new file successfully', async () => {
      const filePath = `${__dirname}/order.pdf`
      const result = await request(app).post('/file').attach('input', filePath);
      expect(result.status).toBe(201);
      expect(result.body.success).toEqual(true);
    });
  });

  describe('GET /file:id', () => {
    it('should get file information', async () => {
      const result = await request(app).get('/file/5d644b6818b1ff0378b8eddb');
      expect(result.status).toBe(200);
      expect(result.body.success).toEqual(true);
    });
    it('should return error for invalid file', async () => {
      const result = await request(app).get('/file/5d644b5d18b1ff0378b8edda');
      expect(result.status).toBe(404);
      expect(result.body.success).toEqual(false);
    });
  });

  describe('DELETE /file:id', () => {
    it('should delete a file', async () => {
      const result = await request(app).delete('/file/5d644b9218b1ff0378b8eddc');
      expect(result.status).toBe(200);
      expect(result.body.success).toEqual(true);
    });
  });
});
