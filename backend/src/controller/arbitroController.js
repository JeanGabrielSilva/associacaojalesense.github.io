import Arbitro from '../model/arbitro.js';
import PagamentoArbitro from '../model/pagamentoArbitro.js';

export const getArbitrosAll = async (req, res) => {
    try {
        const arbitros = await Arbitro.findAll();
        res.send(arbitros);
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao buscar os árbitros." });
    }
};

export const getArbitros = async (req, res) => {
    try {
        const limit = 10;
        const page = parseInt(req.query.page) || 1; 
        const offset = (page - 1) * limit; 

        const { count, rows: arbitros } = await Arbitro.findAndCountAll({
            limit: limit,
            offset: offset
        });

        res.send({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            arbitros: arbitros
        });
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao buscar os árbitros." });
    }
};

export const getArbitroById = async (req, res) => {
    const id = req.params.id;
    try {
        const arbitro = await Arbitro.findByPk(id);
        if (!arbitro) {
            return res.status(404).send({ message: `Não foi possível encontrar árbitro com o ID ${id}` });
        }
        res.send(arbitro);
    } catch (err) {
        res.status(500).send({ message: `Erro ao acessar árbitro com o ID ${id}` });
    }
};

export const createArbitro = async (req, res) => {
    try {
        const novoArbitro = await Arbitro.create(req.body);
        res.send(novoArbitro);
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao criar o árbitro." });
    }
};

export const updateArbitro = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Arbitro.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedArbitro = await Arbitro.findByPk(id);
            res.send(updatedArbitro);
        } else {
            res.status(404).send({ message: `Não foi possível encontrar árbitro com o ID ${id}` });
        }
    } catch (err) {
        res.status(500).send({ message: `Erro ao atualizar árbitro com o ID ${id}` });
    }
};

export const patchArbitro = async (req, res) => {
    const id = req.params.id;
    try {
        const arbitro = await Arbitro.findByPk(id);
        if (!arbitro) {
            return res.status(404).send({ message: `Não foi possível encontrar árbitro com o ID ${id}` });
        }
        await arbitro.update(req.body);
        res.send(arbitro);
    } catch (err) {
        res.status(500).send({ message: `Erro ao atualizar parcialmente árbitro com o ID ${id}` });
    }
};

export const deleteArbitro = async (req, res) => {
    const id = req.params.id;
    try {
        // verifica se existem pagamentos associados ao arbitro
        const pagamentos = await PagamentoArbitro.findAll({ where: { id_arbitro: id } });
        if (pagamentos && pagamentos.length > 0) {
            return res.status(400).send({ message: "Este árbitro não pode ser excluído pois possui pagamentos associados. Remova os pagamentos primeiro." });
        }

        // se não houver pagamentos associados, exclui o arbitro
        const deleted = await Arbitro.destroy({ where: { id: id } });
        if (deleted) {
            res.send({ message: `Árbitro com o ID ${id} excluído com sucesso` });
        } else {
            res.status(404).send({ message: `Não foi possível encontrar árbitro com o ID ${id}` });
        }
    } catch (err) {
        res.status(500).send({ message: `Erro ao excluir árbitro com o ID ${id}` });
    }
};