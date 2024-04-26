import Campeonato from '../model/campeonato.js';

export const createCampeonato = async (req, res) => {
    const newCampeonato = new Campeonato(req.body);
    try {
        const savedCampeonato = await newCampeonato.save();
        res.status(201).json(savedCampeonato);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar campeonato: ' + error.message });
    }
};

export const getCampeonatos = async (req, res) => {
    try {
        const campeonatos = await Campeonato.find().populate('cidade');
        res.status(200).json(campeonatos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar campeonatos: ' + error.message });
    }
};

export const getCampeonatoById = async (req, res) => {
    try {
        const campeonato = await Campeonato.findById(req.params.id).populate('cidade');
        if (!campeonato) {
            return res.status(404).json({ message: 'Campeonato não encontrado' });
        }
        res.status(200).json(campeonato);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar campeonato: ' + error.message });
    }
};

export const updateCampeonato = async (req, res) => {
    try {
        const updatedCampeonato = await Campeonato.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCampeonato) {
            return res.status(404).json({ message: 'Campeonato não encontrado' });
        }
        res.status(200).json(updatedCampeonato);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar campeonato: ' + error.message });
    }
};

export const deleteCampeonato = async (req, res) => {
    try {
        const campeonato = await Campeonato.findByIdAndDelete(req.params.id);
        if (!campeonato) {
            return res.status(404).json({ message: 'Campeonato não encontrado' });
        }
        res.status(200).json({ message: 'Campeonato deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar campeonato: ' + error.message });
    }
};
