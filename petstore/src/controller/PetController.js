const Pet = require('../model/Pet');

module.exports = {
    async inserir(req, res) {
        const { nome, raca, idade } = req.body;

        if (idade < 0 || idade > 200) {
            return res.status(400).json({
                "erro": "Idade inválida",
                "mensagem": "A idade deve estar entre 0 e 200"
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

        // Spread syntax ...(condition && { key: value }) inclui campos em objects dinamicamente baseado em condições.
        let query = {
            ...(nome && { nome: nome }),
            ...(raca && { raca: raca }),
        };

        pets = await Pet.find(query);

        return res.status(200).json(pets);
    }
};