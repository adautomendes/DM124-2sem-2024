const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const logger = require('./src/logger')(__filename);

const routes = require('./routes');
require('dotenv').config();

const app = express();

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

app.use((req, res, next) => {
    logger.request(req);
    next();
});

app.use('/', routes);

const porta = process.env.PORT;

app.listen(porta, () => {
    logger.info(`Auth rodando na porta ${porta}`);
});