const express = require('express');
const PetController = require('./src/controller/PetController');
const AuthController = require('./src/controller/AuthController');
const rootRouter = express.Router();
const petRouter = express.Router();

// localhost:3000/
rootRouter.get('/',
    (req, res) => {
        res.json({
            "message": "Hello world"
        });
    }
);

rootRouter.use('/pet', AuthController.verificaJWT, petRouter);
petRouter.post('/', PetController.validaPet, PetController.inserir);
petRouter.patch('/:nome', PetController.validaPet, PetController.atualizar);
petRouter.get('/', PetController.buscar);
petRouter.delete('/:nome', PetController.excluir);

module.exports = rootRouter;