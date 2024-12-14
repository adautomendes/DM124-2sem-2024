const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const logger = require('./src/logger')(__filename);
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
    logger.info(`[CEASE ALARM] - DB up`);
    dbUp = true;
});
mongoose.connection.on('disconnected', () => {
    logger.info(`[RAISE ALARM] - DB down`);
    dbUp = false;
});

app.use((req, res, next) => {
    logger.debug(`[MIDDLEWARE] - DB Health Check`);
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
    logger.debug(req.body);
    next();
});

app.use('/', routes);


mongoose.connect(DB.DB_URL, DB.DB_SETTINGS)
    .then(() => logger.info(`Conectado no MongoDB: ${DB.DB_URL}`))
    .catch(err => logger.info(`Erro ao conectar no MongoDB: ${err}`));

const porta = process.env.PORT;

app.listen(porta, () => {
    logger.info(`Petstore rodando na porta ${porta}`);
});