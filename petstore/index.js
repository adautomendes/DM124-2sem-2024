const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const routes = require('./routes');
const DB = require('./src/database/config');
require('dotenv').config();

const app = express();
let dbUp = true;

app.use(express.json());

if (process.env.NODE_ENV == 'dev') {
    app.use(morgan('short'));
} else {
    app.use(morgan('tiny'));

    const logFileStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });
    app.use(morgan('combined', {
        stream: logFileStream
    }));
}

mongoose.connection.on('connected', () => {
    console.error(`[CEASE ALARM] - DB up`);
    dbUp = true;
});
mongoose.connection.on('disconnected', () => {
    console.error(`[RAISE ALARM] - DB down`);
    dbUp = false;
});

app.use((req, res, next) => {
    console.log(`[MIDDLEWARE] - DB Health Check`);
    if (dbUp) {
        next();
    } else {
        return res.status(503).json({
            "type": "PET003",
            "title": "MongoDB fora do ar.",
            "status": 503,
            "detail": "Não foi possível conectar ao MongoDB",
            "instance": "/pet"
        });
    }
});

app.use((req, res, next) => {
    console.log(`[MIDDLEWARE] - Imprime body`);
    console.log(req.body);
    next();
});

app.use('/', routes);


mongoose.connect(DB.DB_URL, DB.DB_SETTINGS)
    .then(() => console.log(`Conectado no MongoDB: ${DB.DB_URL}`))
    .catch(err => console.log(`Erro ao conectar no MongoDB: ${err}`));

const porta = process.env.PORT;

app.listen(porta, () => {
    console.log(`Petstore rodando na porta ${porta}`);
});