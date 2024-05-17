import React, { useState } from 'react';


function CreateArbitroForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        nome: '',
        idade: '',
        email: '',
        telefone: ''
    });

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
            <h2>Adicionar Novo Árbitro</h2>
            <form  onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="idade"
                    placeholder="Idade"
                    value={formData.idade}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="telefone"
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="btn-submit">Salvar</button>
            </form>
        </div>
    );
}

export default CreateArbitroForm;
