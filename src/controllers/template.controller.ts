import { Router, Request, Response } from 'express';
import { TemplateService } from '../services/template.service';
import { TemplateRepository } from '../repositories/template.repository';
import { NotFoundException } from '../exceptions/not-found.exception';

const router = Router();
const repository = new TemplateRepository();
const service = new TemplateService(repository);

router.get('/api/v1/templates', (req: Request, res: Response) => {
  res.json(service.getAll());
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
