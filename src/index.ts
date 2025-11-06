import express from 'express';
import chatRoute from './chatRoute';

const app = express();
const port = 3007;

app.use(express.json());
app.use(chatRoute);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});