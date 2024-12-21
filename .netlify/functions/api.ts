import express, { Router } from 'express';
import { EstateResolver } from '../../applications/server/src/resolvers/estate.resolver';
import serverless from "serverless-http";

const app = express();

const router = Router();
// Ручное добавление CORS-заголовков
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Разрешаем всем доменам
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Разрешенные методы
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Разрешенные заголовки
    next();
});

const estates = new EstateResolver();

router.get('/estates', (req, res) => {
    const params = req.query;
    const result = estates.getEstates(params);
    res.json(result);
});

app.use("/api/", router);

export const handler = serverless(app);