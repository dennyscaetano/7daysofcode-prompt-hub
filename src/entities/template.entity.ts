import { Template } from '../types/template';

export class TemplateEntity implements Template {
  id: string;
  name: string;
  description?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Omit<Template, 'createdAt' | 'updatedAt'>) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.content = data.content;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(data: Partial<Omit<Template, 'id' | 'createdAt' | 'updatedAt'>>) {
    if (data.name !== undefined) this.name = data.name;
    if (data.description !== undefined) this.description = data.description;
    if (data.content !== undefined) this.content = data.content;
    this.updatedAt = new Date();
  }
}
