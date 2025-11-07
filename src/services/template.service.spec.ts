import { TemplateService } from './template.service';
import { TemplateRepository } from '../repositories/template.repository';
import { NotFoundException } from '../exceptions/not-found.exception';

describe('TemplateService', () => {
  let repository: TemplateRepository;
  let service: TemplateService;

  beforeEach(() => {
    repository = new TemplateRepository();
    service = new TemplateService(repository);
  });

  it('deve criar um template', () => {
    const template = service.create({ name: 'Teste', content: 'Conteúdo', description: 'Descrição' });
    expect(template).toHaveProperty('id');
    expect(template.name).toBe('Teste');
    expect(template.content).toBe('Conteúdo');
    expect(template.description).toBe('Descrição');
  });

  it('deve retornar todos os templates', () => {
    service.create({ name: 'A', content: 'B' });
    service.create({ name: 'C', content: 'D' });
    const all = service.getAll();
    expect(all.length).toBe(2);
  });

  it('deve buscar template por id', () => {
    const created = service.create({ name: 'A', content: 'B' });
    const found = service.getById(created.id);
    expect(found.id).toBe(created.id);
  });

  it('deve lançar NotFoundException ao buscar id inexistente', () => {
    expect(() => service.getById('inexistente')).toThrow(NotFoundException);
  });

  it('deve atualizar um template', () => {
    const created = service.create({ name: 'A', content: 'B' });
    const updated = service.update(created.id, { name: 'Novo' });
    expect(updated.name).toBe('Novo');
  });

  it('deve lançar NotFoundException ao atualizar id inexistente', () => {
    expect(() => service.update('inexistente', { name: 'Novo' })).toThrow(NotFoundException);
  });

  it('deve deletar um template', () => {
    const created = service.create({ name: 'A', content: 'B' });
    service.delete(created.id);
    expect(() => service.getById(created.id)).toThrow(NotFoundException);
  });

  it('deve lançar NotFoundException ao deletar id inexistente', () => {
    expect(() => service.delete('inexistente')).toThrow(NotFoundException);
  });
});
