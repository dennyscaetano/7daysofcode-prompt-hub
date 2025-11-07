import request from 'supertest';
import express from 'express';
import templateController from '../../src/controllers/template.controller';

describe('TemplateController', () => {
	const app = express();
	app.use(express.json());
	app.use(templateController);

	let templateId: string;

	it('deve criar um template', async () => {
		const res = await request(app)
			.post('/api/v1/templates')
			.send({ name: 'Teste', content: 'Conteúdo', description: 'Descrição' });
		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('id');
		templateId = res.body.id;
	});

	it('deve listar todos os templates', async () => {
		const res = await request(app).get('/api/v1/templates');
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('data');
		expect(Array.isArray(res.body.data)).toBe(true);
		expect(res.body).toHaveProperty('page');
		expect(res.body).toHaveProperty('limit');
		expect(res.body).toHaveProperty('total');
	});

	it('deve filtrar templates por nome', async () => {
		await request(app).post('/api/v1/templates').send({ name: 'Filtro', content: 'C1' });
		const res = await request(app).get('/api/v1/templates?name=Filtro');
		expect(res.status).toBe(200);
		expect(res.body.data.some((t: any) => t.name === 'Filtro')).toBe(true);
	});

	it('deve ordenar templates por nome desc', async () => {
		await request(app).post('/api/v1/templates').send({ name: 'A', content: 'C2' });
		await request(app).post('/api/v1/templates').send({ name: 'Z', content: 'C3' });
		const res = await request(app).get('/api/v1/templates?order=desc');
		expect(res.status).toBe(200);
		const data = res.body.data;
		if (data.length > 1) {
			expect(data[0].name >= data[1].name).toBe(true);
		}
	});

	it('deve paginar templates', async () => {
		await request(app).post('/api/v1/templates').send({ name: 'Pag1', content: 'C4' });
		await request(app).post('/api/v1/templates').send({ name: 'Pag2', content: 'C5' });
		const res = await request(app).get('/api/v1/templates?page=1&limit=1');
		expect(res.status).toBe(200);
		expect(res.body.data.length).toBe(1);
		expect(res.body.page).toBe(1);
		expect(res.body.limit).toBe(1);
	});

	it('deve buscar um template por id', async () => {
		const res = await request(app).get(`/api/v1/templates/${templateId}`);
		expect(res.status).toBe(200);
		expect(res.body.id).toBe(templateId);
	});

	it('deve retornar 404 ao buscar id inexistente', async () => {
		const res = await request(app).get('/api/v1/templates/inexistente');
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty('error');
	});

	it('deve atualizar um template', async () => {
		const res = await request(app)
			.put(`/api/v1/templates/${templateId}`)
			.send({ name: 'Novo Nome' });
		expect(res.status).toBe(200);
		expect(res.body.name).toBe('Novo Nome');
	});

	it('deve retornar 404 ao atualizar id inexistente', async () => {
		const res = await request(app)
			.put('/api/v1/templates/inexistente')
			.send({ name: 'Novo Nome' });
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty('error');
	});

	it('deve deletar um template', async () => {
		const res = await request(app).delete(`/api/v1/templates/${templateId}`);
		expect(res.status).toBe(204);
	});

	it('deve retornar 404 ao deletar id inexistente', async () => {
		const res = await request(app).delete('/api/v1/templates/inexistente');
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty('error');
	});
});
