import { Template } from '../types/template';
import { TemplateEntity } from '../entities/template.entity';

export class TemplateRepository {
  private templates: TemplateEntity[] = [];

  findAll(): TemplateEntity[] {
    return this.templates;
  }

  findById(id: string): TemplateEntity | undefined {
    return this.templates.find(t => t.id === id);
  }

  create(data: Omit<Template, 'createdAt' | 'updatedAt'>): TemplateEntity {
    const entity = new TemplateEntity(data);
    this.templates.push(entity);
    return entity;
  }

  update(id: string, data: Partial<Omit<Template, 'id' | 'createdAt' | 'updatedAt'>>): TemplateEntity | undefined {
    const entity = this.findById(id);
    if (entity) {
      entity.update(data);
      return entity;
    }
    return undefined;
  }

  delete(id: string): boolean {
    const idx = this.templates.findIndex(t => t.id === id);
    if (idx >= 0) {
      this.templates.splice(idx, 1);
      return true;
    }
    return false;
  }
}
