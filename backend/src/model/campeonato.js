import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const campeonatoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    cidade: {
        type: Schema.Types.ObjectId,
        ref: 'Cidade' 
    }
});

const Campeonato = model('Campeonato', campeonatoSchema);

export default Campeonato;
