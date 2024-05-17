import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Modal from './components-pagcontratantes/Modal';
import CreatePagamentoForm from './components-pagcontratantes/CreatePagamentoForm';
import EditPagamentoForm from './components-pagcontratantes/EditPagamentoForm';
import ConfirmDeleteModal from './components-pagcontratantes/ConfirmDeleteModal';
import DropDownComponent from './DropDownComponent';

function PagamentoContratantes() {
    const [pagamentos, setPagamentos] = useState([]); 
    const [contratantes, setContratantes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const limit = 10;
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentPagamento, setCurrentPagamento] = useState(null);   

    const fetchPagamentos = async (page = 1) => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await fetch(`http://localhost:8080/pagamento-contratante?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setPagamentos(data.pagamentos);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        } catch (error) {
            console.error("Erro ao buscar pagamentos:", error);
            setError(error.message);
        }
    };

    const fetchContratantes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/contratantes/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContratantes(response.data);
        } catch (error) {
            console.error("Erro ao buscar contratantes:", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchPagamentos(currentPage);
        fetchContratantes();
    }, [currentPage]);


    const handleCreateSubmit = useCallback(async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/pagamento-contratante', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const novoPagamento = response.data;
    
            // Buscar o pagamento recém-criado com o contratante incluído
            const pagamentoAtualizadoResponse = await axios.get(`http://localhost:8080/pagamento-contratante/${novoPagamento.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const pagamentoAtualizado = pagamentoAtualizadoResponse.data;
    
            setPagamentos([...pagamentos, pagamentoAtualizado]);
            setShowCreateModal(false);
        } catch (error) {
            console.error('Erro ao criar pagamento:', error);
            setError('Erro ao criar pagamento');
        }
    }, [pagamentos]);

    const deletePagamento = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/pagamento-contratante/${id}`, {
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

    const confirmDelete = async () => {
        try {
            await deletePagamento(currentPagamento.id);
            // Atualizar localmente a lista de pagamentos removendo o item deletado
            setPagamentos(pagamentos.filter(p => p.id !== currentPagamento.id));
            setShowDeleteModal(false);
            setCurrentPagamento(null);
        } catch (error) {
            console.error('Erro ao deletar pagamento:', error);
            setError('Erro ao deletar pagamento');
        }
    };

    const handleEdit = useCallback((pagamento) => {
        setCurrentPagamento(pagamento);
        setShowEditModal(true);
    }, []);
    
    const handleEditSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/pagamento-contratante/${currentPagamento.id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const pagamentoAtualizadoResponse = await axios.get(`http://localhost:8080/pagamento-contratante/${currentPagamento.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const pagamentoAtualizado = pagamentoAtualizadoResponse.data;
            setPagamentos(pagamentos.map(p => (p.id === currentPagamento.id ? pagamentoAtualizado : p)));
            setShowEditModal(false);
            setCurrentPagamento(null);
        } catch (error) {
            console.error('Erro ao editar pagamento:', error);
            setError('Erro ao editar pagamento');
        }
    };
    const handleDelete = useCallback((pagamento) => {
        setCurrentPagamento(pagamento);
        setShowDeleteModal(true);
    }, []);

    const handlePageChange = useCallback((event) => {
        setCurrentPage(Number(event.target.value));
    }, []);

    return (
        <div className="container">
            <div className="sidebar">
                <h2>Menu</h2>
                <ul>
                    <li><a href="/arbitros">Postagens</a></li>
                    <li><a href="/postagens">Árbitros</a></li>
                    <li><a href="/contratantes">Contratantes</a></li>
                    <DropDownComponent/>
                </ul>
            </div>
            <div className="main-table">
                <h2>Pagamento dos Contratantes</h2>
                <button className="btn-open-modal" onClick={() => setShowCreateModal(true)}>Adicionar Pagamento</button>
                {error && <p>{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Contratantes</th>
                            <th>Valor</th>
                            <th>Pago</th>
                            <th>Operações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagamentos.map((pagamento) => (
                            <tr key={pagamento.id}>
                                <td>{pagamento.id}</td>
                                <td>{pagamento.contratante?.nome || 'Desconhecido'}</td>
                                <td>{pagamento.valor}</td>
                                <td>{pagamento.pago ? 'Sim' : 'Não'}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => handleEdit(pagamento)}>✏️</button>
                                    <button className="btn-delete" onClick={() => handleDelete(pagamento)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <select value={currentPage} onChange={handlePageChange}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                Página {index + 1}
                            </option>
                        ))}
                    </select>
                </div>
                {showCreateModal && (
                    <Modal onClose={() => setShowCreateModal(false)}>
                        <CreatePagamentoForm 
                        contratantes={contratantes} 
                        onSubmit={handleCreateSubmit} />
                    </Modal>
                )}
                {showEditModal && (
                    <Modal onClose={() => setShowEditModal(false)}>
                        <EditPagamentoForm 
                        pagamento={currentPagamento} contratantes={contratantes}
                        onSubmit={handleEditSubmit} />
                    </Modal>
                )}     
                {showDeleteModal && (
                    <Modal onClose={() => setShowDeleteModal(false)}>
                        <ConfirmDeleteModal
                            pagamento={currentPagamento}
                            onConfirm={confirmDelete}
                            onCancel={() => setShowDeleteModal(false)}
                        />
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default PagamentoContratantes;
