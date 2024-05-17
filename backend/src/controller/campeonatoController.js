import Campeonato from '../model/campeonato.js';
import Contratante from '../model/contratante.js';

export const getCampeonatosAll = async (req, res) => {
    try {
        const campeonatos = await Campeonato.findAll({
            include: [Contratante]
        });
        res.send(campeonatos);
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao buscar os campeonatos." });
    }
};

export const getCampeonatos = async (req, res) => {
    try {
        const limit = 10;
        const page = parseInt(req.query.page) || 1; 
        const offset = (page - 1) * limit; 

        const { count, rows: campeonatos } = await Campeonato.findAndCountAll({
            limit: limit,
            offset: offset,
            include: [Contratante]
        });

        res.send({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            campeonatos: campeonatos
        });
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao buscar os campeonatos." });
    }
};

export const getCampeonatoById = async (req, res) => {
    const id = req.params.id;
    try {
        const campeonato = await Campeonato.findByPk(id, {
            include: [Contratante]
        });
        if (!campeonato) {
            return res.status(404).send({ message: `Não foi possível encontrar campeonato com o ID ${id}` });
        }
        res.send(campeonato);
    } catch (err) {
        res.status(500).send({ message: `Erro ao acessar campeonato com o ID ${id}` });
    }
};

export const createCampeonato = async (req, res) => {
    try {
        const novoCampeonato = await Campeonato.create(req.body);
        res.send(novoCampeonato);
    } catch (err) {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao criar o campeonato." });
    }
};

export const updateCampeonato = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Campeonato.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedCampeonato = await Campeonato.findByPk(id);
            res.send(updatedCampeonato);
        } else {
            res.status(404).send({ message: `Não foi possível encontrar campeonato com o ID ${id}` });
        }
    } catch (err) {
        res.status(500).send({ message: `Erro ao atualizar campeonato com o ID ${id}` });
    }
};

export const deleteCampeonato = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Campeonato.destroy({ where: { id: id } });
        if (deleted) {
            res.send({ message: "Campeonato deletado com sucesso." });
        } else {
            res.status(404).send({ message: `Não foi possível encontrar campeonato com o ID ${id}` });
        }
    } catch (err) {
        res.status(500).send({ message: `Erro ao deletar campeonato com o ID ${id}` });
    }
};