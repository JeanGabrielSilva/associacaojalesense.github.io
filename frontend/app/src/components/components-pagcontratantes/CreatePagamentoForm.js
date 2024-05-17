import React, { useState } from 'react';

function CreatePagamentoForm({ contratantes, onSubmit }) {
    const [formData, setFormData] = useState({
        id_contratante: '',
        valor: '',
        pago: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, pago: e.target.checked });
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
            <h2>Adicionar Pagamento</h2>
            <form onSubmit={handleSubmit}>
                <select className="custom-select" name="id_contratante" value={formData.id_contratante} onChange={handleInputChange} required>
                    <option value="">Selecione o Contratante</option>
                    {contratantes.map(contratante => (
                        <option key={contratante.id} value={contratante.id}>{contratante.nome}</option>
                    ))}
                </select>
                <input
                    type="number"
                    name="valor"
                    placeholder="Valor"
                    value={formData.valor}
                    onChange={handleInputChange}
                    required
                />
                <label className="custom-checkbox">
                    Pago:
                    <input
                        type="checkbox"
                        name="pago"
                        checked={formData.pago}
                        onChange={handleCheckboxChange}
                    />
                </label>
                <button type="submit" className="btn-submit">Salvar</button>
            </form>
        </div>
    );
}

export default CreatePagamentoForm;
