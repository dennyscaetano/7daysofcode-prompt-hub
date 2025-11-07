import express from 'express';
import templateController from './controllers/template.controller';
import chatController from './controllers/chat.controller';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(templateController);
app.use(chatController);

app.get('/doc', (req, res) => {
	const swaggerPath = path.join(__dirname, 'swagger.json');
	fs.readFile(swaggerPath, 'utf8', (err, data) => {
		if (err) {
			return res.status(500).json({ error: 'Não foi possível carregar a documentação.' });
		}
		res.type('application/json').send(data);
	});
});

export default app;
