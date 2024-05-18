import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/modal.css';

function FinanceiroArbitroForm({ arbitro, arbitroId, onClose }) {
    const [pagamentos, setPagamentos] = useState([]);
    const [debito, setDebito] = useState(0);
    const [credito, setCredito] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFinanceiro = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/financeiro/arbitro/${arbitroId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setPagamentos(response.data.pagamentos);
                setDebito(response.data.debito);
                setCredito(response.data.credito);
            } catch (error) {
                console.error('Erro ao buscar informações financeiras do árbitro:', error);
                setError('Erro ao buscar informações financeiras do árbitro');
            }
        };

        fetchFinanceiro();
    }, [arbitroId]);

    return (
        <div className="financeiro-modal">
            <h2>Informações Financeiras do Árbitro <strong>{arbitro?.nome}</strong> </h2>
            {error && <p className="error-message">{error}</p>}
            <div className="financeiro-content">
                <p className="debito"><strong>Débito: </strong>{debito}</p>
                <p className="credito"><strong>Crédito: </strong>{credito}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Valor</th>
                            <th>Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagamentos.map((pagamento, index) => (
                            <tr key={pagamento.id || index}>
                                <td>{pagamento.valor}</td>
                                <td>{pagamento.pago ? 'Sim' : 'Não'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FinanceiroArbitroForm;
