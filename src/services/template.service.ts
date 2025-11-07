import { Template } from '../types/template';
import { TemplateRepository } from '../repositories/template.repository';
import { NotFoundException } from '../exceptions/not-found.exception';

export class TemplateService {
  constructor(private readonly repository: TemplateRepository) {}

  getAll(): Template[] {
    return this.repository.findAll();
  }

  getById(id: string): Template {
    const template = this.repository.findById(id);
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }

  create(data: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>): Template {
    const id = Math.random().toString(36).substring(2, 15);
    return this.repository.create({ ...data, id });
  }

  update(id: string, data: Partial<Omit<Template, 'id' | 'createdAt' | 'updatedAt'>>): Template {
    const updated = this.repository.update(id, data);
    if (!updated) throw new NotFoundException('Template not found');
    return updated;
  }

  delete(id: string): void {
    const deleted = this.repository.delete(id);
    if (!deleted) throw new NotFoundException('Template not found');
  }
}
