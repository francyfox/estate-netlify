import express from 'express';
import { EstateResolver } from './resolvers/estate.resolver';

const app = express();
const port = 3000;

// Ручное добавление CORS-заголовков
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Разрешаем всем доменам
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Разрешенные методы
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Разрешенные заголовки
  next();
});

const estates = new EstateResolver();

app.get('/estates', (req, res) => {
  const params = req.query;
  const result = estates.getEstates(params);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
