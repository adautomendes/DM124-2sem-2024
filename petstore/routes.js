const express = require('express');
const PetController = require('./src/controller/PetController');
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

rootRouter.use('/pet', petRouter);
petRouter.post('/', PetController.inserir);
petRouter.get('/', PetController.buscar);

module.exports = rootRouter;