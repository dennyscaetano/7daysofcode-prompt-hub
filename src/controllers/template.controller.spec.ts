import request from 'supertest';
import express from 'express';
import templateController from './template.controller';

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
    expect(Array.isArray(res.body)).toBe(true);
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
