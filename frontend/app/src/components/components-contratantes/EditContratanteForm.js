import React, { useState, useEffect } from 'react';


function EditContratanteForm({ contratante, onSubmit }) {
    const [formData, setFormData] = useState({
        nome: '',
        contato: '',
        cidade: ''
    });

    useEffect(() => {
        if (contratante) {
            setFormData(contratante);
        }
    }, [contratante]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div>
            <h2>Editar Contratante</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="contato"
                    placeholder="Contato"
                    value={formData.contato}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="cidade"
                    placeholder="Cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="btn-submit">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default EditContratanteForm;
