import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cidadeSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    cep: {
        type: String
    },
    contato : String,
    info: String
});

const Cidade = model('Cidade', cidadeSchema);

export default Cidade;
