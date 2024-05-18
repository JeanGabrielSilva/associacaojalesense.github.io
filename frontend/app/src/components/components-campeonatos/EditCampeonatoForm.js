import React, { useState, useEffect } from 'react';

function EditCampeonatoForm({ campeonato, contratantes, onSubmit }) {
    const [formData, setFormData] = useState({
        id_contratante: '',
        nome: '',
        instituicao: '',
        status: ''
    });

    useEffect(() => {
        if (campeonato) {
            setFormData(campeonato);
        }
    }, [campeonato]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="edit-form">
            <h2>Editar Campeonato</h2>
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
                <button type="submit" className="btn-submit">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default EditCampeonatoForm;
