import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postagemSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    imagem: String,
    conteudo: {
        type: String,
        required: true
    },
    tags: [String],
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['rascunho', 'publicado'],
        default: 'rascunho'
    }
});

const Postagem = model('Postagem', postagemSchema);

export default Postagem;
