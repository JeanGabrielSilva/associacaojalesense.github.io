import Contratante from '../model/contratante.js'; 
import Campeonato from '../model/campeonato.js';
import PagamentoContratante from '../model/pagamentoContratante.js';

export const getContratantesAll = async (req, res) => {
    try {
        const contratantes = await Contratante.findAll();
        res.send(contratantes);
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao buscar os contratantes." });
    }
};

export const getContratantes = async (req, res) => {
    try {
        const limit = 10;
        const page = parseInt(req.query.page) || 1; 
        const offset = (page - 1) * limit; 

        const { count, rows: contratantes } = await Contratante.findAndCountAll({
            limit: limit,
            offset: offset
        });

        res.send({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            contratantes: contratantes
        });
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao buscar os contratantes." });
    }
};

export const getContratanteById = async (req, res) => {
    const id = req.params.id;
    try {
        const contratante = await Contratante.findByPk(id);
        if (!contratante) {
            return res.status(404).send({ message: `Não foi possível encontrar contratante com o ID ${id}` });
        }
        res.send(contratante);
    } catch (err) {
        res.status(500).send({ message: `Erro ao acessar contratante com o ID ${id}` });
    }
};

export const createContratante = async (req, res) => {
    try {
        const novoContratante = await Contratante.create(req.body);
        res.send(novoContratante);
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao criar o contratante." });
    }
};

export const updateContratante = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Contratante.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedContratante = await Contratante.findByPk(id);
            res.send(updatedContratante);
        } else {
            res.status(404).send({ message: `Não foi possível encontrar contratante com o ID ${id}` });
        }
    } catch (err) {
        res.status(500).send({ message: `Erro ao atualizar contratante com o ID ${id}` });
    }
};


export const deleteContratante = async (req, res) => {
    const id = req.params.id;
    try {
        // Verifica se o contratante tem campeonatos relacionados
        const campeonatos = await Campeonato.findAll({ where: { id_contratante: id } });
        if (campeonatos.length > 0) {
            console.log(`Contratante com ID ${id} tem campeonatos relacionados.`);
            return res.status(400).send({ message: "Não é possível deletar o contratante, pois ele tem campeonatos relacionados." });
        }

        // Verifica se o contratante tem pagamentos relacionados
        const pagamentos = await PagamentoContratante.findAll({ where: { id_contratante: id } });
        if (pagamentos.length > 0) {
            console.log(`Contratante com ID ${id} tem pagamentos relacionados.`);
            return res.status(400).send({ message: "Não é possível deletar o contratante, pois ele tem pagamentos relacionados." });
        }

        // Deleta o contratante
        const deleted = await Contratante.destroy({ where: { id: id } });
        if (deleted) {
            console.log(`Contratante com ID ${id} deletado com sucesso.`);
            res.send({ message: "Contratante deletado com sucesso." });
        } else {
            console.log(`Contratante com ID ${id} não encontrado.`);
            res.status(404).send({ message: `Não foi possível encontrar contratante com o ID ${id}` });
        }
    } catch (err) {
        console.error(`Erro ao deletar contratante com o ID ${id}:`, err);
        res.status(500).send({ message: `Erro ao deletar contratante com o ID ${id}` });
    }
};