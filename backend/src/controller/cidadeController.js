// import Cidade from '../model/cidade.js';

// export const createCidade = async (req, res) => {
//     const newCidade = new Cidade(req.body);
//     try {
//         const savedCidade = await newCidade.save();
//         res.status(201).json(savedCidade);
//     } catch (error) {
//         res.status(400).json({ message: 'Erro ao criar cidade: ' + error.message });
//     }
// };

// export const getCidades = async (req, res) => {
//     try {
//         const cidades = await Cidade.find();
//         res.status(200).json(cidades);
//     } catch (error) {
//         res.status(500).json({ message: 'Erro ao buscar cidades: ' + error.message });
//     }
// };

// export const getCidadeById = async (req, res) => {
//     try {
//         const cidade = await Cidade.findById(req.params.id);
//         if (!cidade) {
//             return res.status(404).json({ message: 'Cidade não encontrada' });
//         }
//         res.status(200).json(cidade);
//     } catch (error) {
//         res.status(500).json({ message: 'Erro ao buscar cidade: ' + error.message });
//     }
// };

// export const updateCidade = async (req, res) => {
//     try {
//         const updatedCidade = await Cidade.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedCidade) {
//             return res.status(404).json({ message: 'Cidade não encontrada' });
//         }
//         res.status(200).json(updatedCidade);
//     } catch (error) {
//         res.status(400).json({ message: 'Erro ao atualizar cidade: ' + error.message });
//     }
// };

// export const deleteCidade = async (req, res) => {
//     try {
//         const cidade = await Cidade.findByIdAndDelete(req.params.id);
//         if (!cidade) {
//             return res.status(404).json({ message: 'Cidade não encontrada' });
//         }
//         res.status(200).json({ message: 'Cidade deletada com sucesso' });
//     } catch (error) {
//         res.status(400).json({ message: 'Erro ao deletar cidade: ' + error.message });
//     }
// };
