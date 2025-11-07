import { Router, Request, Response } from 'express';
import { TemplateService } from '../services/template.service';
import { TemplateRepository } from '../repositories/template.repository';
import { NotFoundException } from '../exceptions/not-found.exception';

const router = Router();
const repository = new TemplateRepository();
const service = new TemplateService(repository);

router.get('/api/v1/templates', (req: Request, res: Response) => {
  const { page = '1', limit = '10', name, order = 'asc' } = req.query;
  let templates = service.getAll();
  if (name && typeof name === 'string') {
    templates = templates.filter(t => t.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (order === 'asc' || order === 'desc') {
    templates = templates.sort((a, b) => {
      if (a.name < b.name) return order === 'asc' ? -1 : 1;
      if (a.name > b.name) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  const start = (pageNum - 1) * limitNum;
  const paginated = templates.slice(start, start + limitNum);
  res.json({
    data: paginated,
    page: pageNum,
    limit: limitNum,
    total: templates.length
  });
});

router.post('/api/v1/templates', (req: Request, res: Response) => {
  const { name, description, content } = req.body;
  const template = service.create({ name, description, content });
  res.status(201).json(template);
});

router.get('/api/v1/templates/:id', (req: Request, res: Response) => {
  try {
    const template = service.getById(req.params.id);
    res.json(template);
  } catch (err) {
    if (err instanceof NotFoundException) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.put('/api/v1/templates/:id', (req: Request, res: Response) => {
  try {
    const updated = service.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    if (err instanceof NotFoundException) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.delete('/api/v1/templates/:id', (req: Request, res: Response) => {
  try {
    service.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    if (err instanceof NotFoundException) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router;
