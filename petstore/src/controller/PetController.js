const Pet = require('../model/Pet');

module.exports = {
    async inserir(req, res) {
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

    async buscar(req, res) {
        const { nome } = req.query;
        let pets = [];

        if (nome) {
            // SELECT * FROM pet WHERE nome = ${petRequest.nome}
            pets = await Pet.find({ nome: nome });
        } else {
            // SELECT * FROM pet
            pets = await Pet.find();
        }

        return res.status(200).json(pets);
    }
};