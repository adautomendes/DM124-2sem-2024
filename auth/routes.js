const express = require('express');
const AuthController = require('./src/controller/AuthController');
const rootRouter = express.Router();
const authRouter = express.Router();

// localhost:3001/
rootRouter.get('/',
    (req, res) => {
        res.json({
            "message": "Hello world"
        });
    }
);

rootRouter.use('/auth', authRouter);
authRouter.post('/login', AuthController.login);
authRouter.post('/validaToken', AuthController.verificaJWT);

module.exports = rootRouter;