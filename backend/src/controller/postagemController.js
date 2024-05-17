import Postagem from '../model/postagem.js';


export const getPostagemById = async (req, res) => {
    try {
        const { id } = req.params;
        const postagem = await Postagem.findById(id);

        if (!postagem) {
            return res.status(404).json({ message: 'Postagem não encontrada' });
        }

        res.json(postagem);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Ocorreu algum erro ao buscar a postagem.' });
    }
};

export const getPostagens = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; 
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit; 

        const [count, postagens] = await Promise.all([
            Postagem.countDocuments(),
            Postagem.find().limit(limit).skip(offset)
        ]);

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            postagens: postagens
        });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Ocorreu algum erro ao buscar as postagens.' });
    }
};

export const getPostagensPublicadas = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 3; 
        const page = parseInt(req.query.page) || 1; 
        const offset = (page - 1) * limit; 

        const [count, postagensPublicadas] = await Promise.all([
            Postagem.countDocuments({ status: 'publicado' }),
            Postagem.find({ status: 'publicado' })
                .sort({ createAt: -1 }) 
                .limit(limit)
                .skip(offset)
        ]);

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            postagens: postagensPublicadas
        });
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