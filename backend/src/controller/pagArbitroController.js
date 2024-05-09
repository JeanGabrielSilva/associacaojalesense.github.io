import PagamentoArbitro from '../model/pagamentoArbitro.js';
import Arbitro from '../model/arbitro.js';

export const getPagamentosArbitro = async (req, res) => {
    try {
        const pagamentos = await PagamentoArbitro.findAll({
            include: [{
                model: Arbitro,
                as: 'arbitro'
            }]
        });
        res.send(pagamentos);
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao buscar os pagamentos." });
    }
};

export const getPagamentoArbitroById = async (req, res) => {
    const id = req.params.id;
    try {
        const pagamento = await PagamentoArbitro.findByPk(id, {
            include: [{
                model: Arbitro,
                as: 'arbitro'
            }]
        });
        if (!pagamento) {
            return res.status(404).send({ message: "Pagamento não encontrado." });
        }
        res.send(pagamento);
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao buscar o pagamento." });
    }
};

export const createPagamentoArbitro = async (req, res) => {
    try {
        const novoPagamento = await PagamentoArbitro.create(req.body);
        res.send(novoPagamento);
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao criar o pagamento." });
    }
};

export const updatePagamentoArbitro = async (req, res) => {
    const id = req.params.id;
    try {
        const pagamentoAtualizado = await PagamentoArbitro.update(req.body, {
            where: { id: id }
        });
        res.send({ message: "Pagamento atualizado com sucesso!" });
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao atualizar o pagamento." });
    }
};

export const patchPagamentoArbitro = async (req, res) => {
    const id = req.params.id;
    try {
        const pagamento = await PagamentoArbitro.findByPk(id);
        if (!pagamento) {
            return res.status(404).send({ message: "Pagamento não encontrado." });
        }
        await pagamento.update(req.body);
        res.send({ message: "Pagamento atualizado com sucesso!" });
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao atualizar parcialmente o pagamento." });
    }
};

export const deletePagamentoArbitro = async (req, res) => {
    const id = req.params.id;
    try {
        await PagamentoArbitro.destroy({
            where: { id: id }
        });
        res.send({ message: "Pagamento excluído com sucesso!" });
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao excluir o pagamento." });
    }
};

