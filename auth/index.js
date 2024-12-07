const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.body);
    next();
});

app.use('/', routes);

const porta = process.env.PORT;

app.listen(porta, () => {
    console.log(`Auth rodando na porta ${porta}`);
});