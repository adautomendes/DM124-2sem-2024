const jwt = require('jsonwebtoken');
const logger = require('../logger')(__filename);
require('dotenv').config();

module.exports = {
    login(req, res) {
        const { user, pass } = req.body;

        if (user && pass) {
            //Gerar o token
            let token = jwt.sign({ user, pass }, process.env.CHAVE_PRIVADA, {
                expiresIn: `${process.env.TEMPO_EXP}`
            });

            logger.info(`User ${user} foi logado com sucesso.`);
            return res.status(200).json({ token, expiresIn: `${process.env.TEMPO_EXP}` });
        } else {
            return res.status(401).json({
                "type": "AUTH001",
                "title": "Login inválido.",
                "status": 401,
                "detail": "User e/ou pass não fornecidos.",
                "instance": "/auth"
            });
        }
    },

    verificaJWT(req, res) {
        const { token } = req.headers;

        if (token) {
            logger.debug(`Verificando token ${token.slice(0, 10)}...`);

            jwt.verify(token, process.env.CHAVE_PRIVADA, (error, decoded) => {
                if (error) {
                    return res.status(401).json({
                        "type": "AUTH002",
                        "title": "Token inválido.",
                        "status": 401,
                        "detail": "O token fornecido não é válido.",
                        "instance": "/auth"
                    });
                } else {
                    return res.status(200).json({ user: decoded.user, token });
                }
            });
        } else {
            return res.status(401).json({
                "type": "AUTH003",
                "title": "Token não fornecido.",
                "status": 401,
                "detail": "O token não foi fornecido.",
                "instance": "/auth"
            });
        }
    }
}