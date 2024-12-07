const Pet = require('../model/Pet');

module.exports = {
    async inserir(req, res) {
        const { nome, raca, idade } = req.body;

        if (idade < 0 || idade > 200) {
            // RFC 7807 - Problem Details
            return res.status(400).json({
                "type": "ERR001",
                "title": "Idade inválida.",
                "status": 400,
                "detail": "A idade deve estar entre 0 e 200.",
                "instance": "/pet"
            });
        }

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
    }
};