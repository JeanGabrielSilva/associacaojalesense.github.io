import React, { useState } from 'react';

function CreateCampeonatoForm({ contratantes, onSubmit }) {
    const [formData, setFormData] = useState({
        id_contratante: '',
        nome: '',
        instituicao: '',
        status: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const contratante = contratantes.find(contratante => contratante.id === parseInt(formData.id_contratante, 10));
        if (!contratante) {
            alert('Contratante não encontrado. Por favor, selecione um contratante válido.');
            return;
        }

        onSubmit(formData);
    };

    return (
        <div className="create-form">
            <h2>Adicionar Campeonato</h2>
            <form onSubmit={handleSubmit}>
                <select className="custom-select" name="id_contratante" value={formData.id_contratante} onChange={handleInputChange} required>
                    <option value="">Selecione o Contratante</option>
                    {contratantes.map(contratante => (
                        <option key={contratante.id} value={contratante.id}>{contratante.nome}</option>
                    ))}
                </select>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome do Campeonato"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="instituicao"
                    placeholder="Instituição"
                    value={formData.instituicao}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Status (Concluído, Planejado ou Em Andamento)"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="btn-submit">Salvar</button>
            </form>
        </div>
    );
}

export default CreateCampeonatoForm;
