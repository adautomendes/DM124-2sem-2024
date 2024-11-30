const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const DB = require('./src/database/config');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.body);
    next();
});

app.use('/', routes);

mongoose.connect(DB.DB_URL, DB.DB_SETTINGS)
    .then(() => console.log(`Conectado no MongoDB: ${DB.DB_URL}`))
    .catch(err => console.log(`Erro ao conectar no MongoDB: ${err}`));

const porta = process.env.PORT || 3001;

app.listen(porta, () => {
    console.log(`Petstore rodando na porta ${porta}`);
});