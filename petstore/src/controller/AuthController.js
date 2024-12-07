const axios = require('axios');
require('dotenv').config();

module.exports = {
    verificaJWT(req, res, next) {
        console.log(`[MIDDLEWARE] - Verifica JWT`);
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

        console.log(`Enviando request para [${request.url}].`);
        axios.post(request.url, request.data, request.config)
            .then(response => {
                console.log(`Token ok!`);
                next();
            })
            .catch(error => {
                if (error.response) {
                    console.log(`Token inválido.`);
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