import React, { useState, useEffect } from 'react';

function EditPagamentoForm({ pagamento, contratantes, onSubmit }) {
    const [formData, setFormData] = useState({
        id_contratante: '',
        valor: '',
        pago: false
    });

    useEffect(() => {
        if (pagamento) {
            setFormData(pagamento);
        }
    }, [pagamento]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, pago: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="edit-form">
            <h2>Editar Pagamento</h2>
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
                <button type="submit" className="btn-submit">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default EditPagamentoForm;
