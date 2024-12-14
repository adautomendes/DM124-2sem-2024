const Pet = require('../model/Pet');

module.exports = {
    async inserir(req, res) {
        console.log(`[ROTA] - Inserir`);
        const { nome, raca, idade } = req.body;

        // SELECT * FROM pet WHERE nome = ${nome}
        const petExistente = await Pet.findOne({ nome });

        if (petExistente) {
            console.log(`Pet já existe ${petExistente.nome}.`);
            return res.status(200).json(petExistente);
        }

        const pet = await Pet.create({ nome, raca, idade });

        console.log(`Pet criado ${pet.nome}.`);
        return res.status(201).json(pet);
    },

    // http://localhost:3000/pet/Caramelo => req.params
    async atualizar(req, res) {
        const { nome } = req.params;
        const { idade } = req.body;

        // UPDATE XX SET XX=YY WHERE ...
        const updateReturn = await Pet.updateOne({ nome }, { idade });
        console.log(updateReturn);
        
        const updatedPet = await Pet.findOne({ nome });
        res.status(200).json(updatedPet);
    },

    async buscar(req, res) {
        const { nome, raca } = req.query;
        let pets = [];

        // Spread operator
        let query = {
            ...(nome && { nome: nome }),
            ...(raca && { raca: raca })
        };

        console.log(query);

        pets = await Pet.find(query);

        return res.status(200).json({
            size: pets.length,
            results: pets
        });
    },

    async excluir(req, res) {
        const { nome } = req.params;

        await Pet.deleteOne({ nome });
        res.status(204).json();
    },

    validaIdade(req, res, next) {
        console.log(`[MIDDLEWARE] - Valida Idade`);
        const { idade } = req.body;

        if (idade < 0 || idade > 200) {
            // RFC 7807 - Problem Details
            return res.status(400).json({
                "type": "PET001",
                "title": "Idade inválida.",
                "status": 400,
                "detail": "A idade deve estar entre 0 e 200.",
                "instance": "/pet",
            });
        }
        next();
    },

    async validaPetExistente(req, res, next) {
        console.log(`[MIDDLEWARE] - Valida Pet Existente`);
        const { nome } = req.params;

        const pet = await Pet.find({ nome });

        if (pet.length == 0) { //Não encontrei pet com o nome enviado na req
            return res.status(404).json({
                "type": "PET004",
                "title": "Pet não encontrado.",
                "status": 404,
                "detail": `O pet ${nome} não foi encontrado na base de dados`,
                "instance": "/pet"
            });
        }

        next();
    }
};