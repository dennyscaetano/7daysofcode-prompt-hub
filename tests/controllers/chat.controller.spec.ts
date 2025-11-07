import request from 'supertest';
import express from 'express';
import chatController from '../../src/controllers/chat.controller';
import * as gemini from '../../src/third-party/gemini';

describe('POST /api/v1/chat', () => {
	const app = express();
	app.use(express.json());
	app.use(chatController);

	beforeEach(() => {
		jest.spyOn(gemini, 'generateGeminiContent').mockClear();
	});

	it('deve retornar 400 se prompt não for enviado', async () => {
		const res = await request(app).post('/api/v1/chat').send({});
		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('error');
	});

	it('deve retornar resultado do Gemini', async () => {
		jest.spyOn(gemini, 'generateGeminiContent').mockResolvedValue({ result: 'mocked' });
		const res = await request(app).post('/api/v1/chat').send({ prompt: 'Olá!' });
		expect(res.status).toBe(200);
		expect(res.body.result).toEqual({ result: 'mocked' });
	});

	it('deve retornar 500 se Gemini lançar erro', async () => {
		jest.spyOn(gemini, 'generateGeminiContent').mockRejectedValue(new Error('Falha')); 
		const res = await request(app).post('/api/v1/chat').send({ prompt: 'erro' });
		expect(res.status).toBe(500);
		expect(res.body).toHaveProperty('error');
		expect(res.body.details).toBe('Falha');
	});
});
