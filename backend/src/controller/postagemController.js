import Postagem from '../model/postagem.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export const createPostagem = ( upload.single('imagem'), async (req, res) => {
    try {
        const { titulo, conteudo, tags, status } = req.body;
        const imagem = req.file ? req.file.path : null;

        console.log('Request Body:', req.body);
        console.log('Request File:', req.file);
        const novaPostagem = new Postagem({
            titulo,
            conteudo,
            tags: tags ? JSON.parse(tags) : [], 
            status,
            imagem
        });

        await novaPostagem.save();
        res.status(201).json(novaPostagem);
    } catch (error) {
        console.error('Erro ao criar postagem:', error);
        res.status(500).json({ message: error.message || 'Ocorreu algum erro ao criar a postagem.' });
    }
});

export const uploadMiddleware = upload.single('imagem');

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
        // Verifica se há uma nova imagem enviada na requisição
        if (req.file) {
            req.body.imagem = req.file.path; // Atualiza o caminho da imagem no corpo da requisição
        }
        
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

        // Deletar a imagem associada à postagem
        if (postagemExcluida.imagem) {
            const imagePath = path.resolve(__dirname, '../../uploads', path.basename(postagemExcluida.imagem));
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Erro ao deletar a imagem: ${err.message}`);
                } else {
                    console.log(`Imagem ${imagePath} deletada com sucesso.`);
                }
            });
        }

        res.json({ message: `Postagem com o ID ${id} excluída com sucesso.` });
    } catch (error) {
        console.error(`Erro ao excluir postagem: ${error.message}`);
        res.status(500).json({ message: error.message || 'Ocorreu algum erro ao excluir a postagem.' });
    }
};