import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const usePagamentoArbitros = () => {
    const [pagamentos, setPagamentos] = useState([]);
    const [arbitros, setArbitros] = useState([]);
    const [error, setError] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();
    const [pagamentosPage, setPagamentosPage] = useState(1);
    const [pagamentosTotalPages, setPagamentosTotalPages] = useState(0);
    const limit = 10;

    useEffect(() => {
        fetchPagamentos(pagamentosPage);
        fetchArbitros();
    }, [navigate, pagamentosPage]);

    useEffect(() => {
        fetchArbitros();
    }, [navigate]);

    const fetchPagamentos = async (page = 1) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/pagamento-arbitro?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPagamentos(response.data.pagamentos || []); 
            setPagamentosTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Erro ao buscar pagamentos:', error);
            setError('Erro ao buscar pagamentos');
        }
    };

    
        const fetchArbitros = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/arbitros/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setArbitros(response.data.arbitros);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Erro ao buscar árbitros:', error);
                setError('Erro ao buscar árbitros');
            }
        };



    const fetchArbitrosAll = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/arbitros/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Resposta da API de árbitros:', response.data); // Adicione este log
            setArbitros(response.data.arbitros || []); // Certifique-se de que é um array
        } catch (error) {
            console.error('Erro ao buscar árbitros:', error);
            setError('Erro ao buscar árbitros');
        }
    };

    const createPagamento = async (formData) => {
        const token = localStorage.getItem('token');

        // Verificar se o árbitro existe
        const arbitro = arbitros.find(arbitro => arbitro.id === parseInt(formData.id_arbitro, 10));
        if (!arbitro) {
            alert('Árbitro não encontrado. Por favor, selecione um árbitro válido.');
            return;
        }

        try {
            // Criar o pagamento
            const response = await axios.post('http://localhost:8080/pagamento-arbitro', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Buscar o pagamento recém-criado com o árbitro incluído
            const novoPagamentoId = response.data.id;
            const novoPagamentoResponse = await axios.get(`http://localhost:8080/pagamento-arbitro/${novoPagamentoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const novoPagamento = novoPagamentoResponse.data;

            // Atualizar a lista de pagamentos com o novo pagamento
            setPagamentos(prevPagamentos => [...prevPagamentos, novoPagamento]);
        } catch (error) {
            console.error('Erro ao criar pagamento:', error);
            setError('Erro ao criar pagamento');
        }
    };

    

    const editPagamento = async (id, formData) => {
        const token = localStorage.getItem('token');
        try {
            // Atualizar o pagamento
            await axios.put(`http://localhost:8080/pagamento-arbitro/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Atualizando o pagamento localmente
            const updatedPagamento = {
                ...pagamentos.find(p => p.id === id),
                ...formData,
                arbitro: arbitros.find(a => a.id === parseInt(formData.id_arbitro, 10))
            };

            setPagamentos(prevPagamentos => prevPagamentos.map(p => (p.id === id ? updatedPagamento : p)));
        } catch (error) {
            console.error('Erro ao editar pagamento:', error);
            setError('Erro ao editar pagamento');
        }
    };

    const deletePagamento = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/pagamento-arbitro/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPagamentos(prevPagamentos => prevPagamentos.filter(pagamento => pagamento.id !== id));
        } catch (error) {
            console.error('Erro ao excluir pagamento:', error);
            setError('Erro ao excluir pagamento');
        }
    };

    return {
        pagamentos,
        arbitros,
        error,
        createPagamento,
        editPagamento,
        deletePagamento,
        fetchPagamentos,
        fetchArbitros
    };
};

export default usePagamentoArbitros;
