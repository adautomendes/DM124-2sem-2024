const { Schema, model } = require('mongoose');

const PetSchema = new Schema(
    {
        nome: { type: String, required: true },
        raca: { type: String, required: true },
        idade: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = model(`Pet`, PetSchema);