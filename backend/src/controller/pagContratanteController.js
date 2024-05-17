import PagamentoContratante from '../model/pagamentoContratante.js'; 
import Contratante from '../model/contratante.js';

export const getPagamentosAll = async (req, res) => {
    try {
        const pagamentos = await PagamentoContratante.findAll({
            include: [{
                model: Contratante,
                as: 'contratante'
            }]
        });
        res.send(pagamentos);
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao buscar os pagamentos." });
    }
};

export const getPagamentos = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; 
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const { count, rows: pagamentos } = await PagamentoContratante.findAndCountAll({
            include: [{
                model: Contratante,
                as: 'contratante'
            }],
            limit: limit,
            offset: offset
        });

        res.send({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            pagamentos: pagamentos
        });
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao buscar os pagamentos." });
    }
};

export const getPagamentoById = async (req, res) => {
    const id = req.params.id;
    try {
        const pagamento = await PagamentoContratante.findByPk(id, {
            include: [{
                model: Contratante,
                as: 'contratante'
            }]
        });
        if (!pagamento) {
            return res.status(404).send({ message: `Não foi possível encontrar pagamento com o ID ${id}` });
        }
        res.send(pagamento);
    } catch (err) {
        res.status(500).send({ message: `Erro ao acessar pagamento com o ID ${id}` });
    }
};

export const createPagamento = async (req, res) => {
    try {
        const novoPagamento = await PagamentoContratante.create(req.body);
        res.send(novoPagamento);
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao criar o pagamento." });
    }
};

export const updatePagamento = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await PagamentoContratante.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedPagamento = await PagamentoContratante.findByPk(id, {
                include: [{
                    model: Contratante,
                    as: 'contratante'
                }]
            });
            res.send(updatedPagamento);
        } else {
            res.status(404).send({ message: `Não foi possível encontrar pagamento com o ID ${id}` });
        }
    } catch (err) {
        res.status(500).send({ message: `Erro ao atualizar pagamento com o ID ${id}` });
    }
};

export const deletePagamento = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await PagamentoContratante.destroy({ where: { id: id } });
        if (deleted) {
            res.send({ message: "Pagamento deletado com sucesso." });
        } else {
            res.status(404).send({ message: `Não foi possível encontrar pagamento com o ID ${id}` });
        }
    } catch (err) {
        res.status(500).send({ message: `Erro ao deletar pagamento com o ID ${id}` });
    }
};

