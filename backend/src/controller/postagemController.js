import Postagem from '../model/postagem.js';

export const getPostagens = async (req, res) => {
    try {
        const postagens = await Postagem.find();
        res.json(postagens);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Ocorreu algum erro ao buscar as postagens.' });
    }
};

export const getPostagensPublicadas = async (req, res) => {
    try {
        const postagensPublicadas = await Postagem.find({ status: 'publicado' });
        res.json(postagensPublicadas);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Ocorreu algum erro ao buscar as postagens publicadas.' });
    }
};

export const createPostagem = async (req, res) => {
    try {
        const novaPostagem = new Postagem(req.body);
        await novaPostagem.save();
        res.status(201).json(novaPostagem);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Ocorreu algum erro ao criar a postagem.' });
    }
};

export const publicPostagem = async (req, res) => {
    const id = req.params.id;
    try {
        const postagem = await Postagem.findByIdAndUpdate(id, { status: 'publicado' }, { new: true });
        if (!postagem) {
            return res.status(404).json({ message: `Postagem com o ID ${id} não encontrada.` });
        }
        res.json(postagem);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Ocorreu algum erro ao publicar a postagem.' });
    }
};

export const updatePostagem = async (req, res) => {
    const id = req.params.id;
    try {
        const postagemAtualizada = await Postagem.findByIdAndUpdate(id, req.body, { new: true });
        if (!postagemAtualizada) {
            return res.status(404).json({ message: `Postagem com o ID ${id} não encontrada.` });
        }
        res.json(postagemAtualizada);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Ocorreu algum erro ao atualizar a postagem.' });
    }
};

export const deletePostagem = async (req, res) => {
    const id = req.params.id;
    try {
        const postagemExcluida = await Postagem.findByIdAndDelete(id);
        if (!postagemExcluida) {
            return res.status(404).json({ message: `Postagem com o ID ${id} não encontrada.` });
        }
        res.json({ message: `Postagem com o ID ${id} excluída com sucesso.` });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Ocorreu algum erro ao excluir a postagem.' });
    }
};