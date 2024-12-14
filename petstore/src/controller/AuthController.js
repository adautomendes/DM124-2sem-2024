const axios = require('axios');
const logger = require('../logger')(__filename);
require('dotenv').config();

module.exports = {
    verificaJWT(req, res, next) {
        logger.debug(`[MIDDLEWARE] - Verifica JWT`);
        const { token } = req.headers;

        let request = {
            url: `${process.env.AUTH_SERVER}/auth/validaToken`,
            data: {},
            config: {
                headers: {
                    token
                }
            }
        }

        logger.info(`Enviando request para [${request.url}].`);
        logger.debug(JSON.stringify(request));
        axios.post(request.url, request.data, request.config)
            .then(response => {
                logger.info(`Token ok!`);
                next();
            })
            .catch(error => {
                if (error.response) {
                    logger.info(`Token inválido.`);
                    return res.status(error.response.status).json(error.response.data);
                }

                return res.status(503).json({
                    "type": "PET002",
                    "title": "Auth fora do ar.",
                    "status": 503,
                    "detail": "Não foi possível conectar ao Auth server",
                    "instance": "/pet"
                });
            });
    }
}