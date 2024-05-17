import React, { useState } from 'react';

function CreatePagamentoForm({ arbitros, onSubmit }) {
    const [formData, setFormData] = useState({
        id_arbitro: '',
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

        // Verificar se o árbitro existe
        const arbitro = arbitros.find(arbitro => arbitro.id === parseInt(formData.id_arbitro, 10));
        if (!arbitro) {
            alert('Árbitro não encontrado. Por favor, selecione um árbitro válido.');
            return;
        }

        onSubmit(formData);
    };

    return (
        <div className="create-form">
            <h2>Adicionar Pagamento</h2>
            <form onSubmit={handleSubmit}>
                <select className="custom-select" name="id_arbitro" value={formData.id_arbitro} onChange={handleInputChange} required>
                    <option value="">Selecione o Árbitro</option>
                    {arbitros.map(arbitro => (
                        <option key={arbitro.id} value={arbitro.id}>{arbitro.nome}</option>
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
