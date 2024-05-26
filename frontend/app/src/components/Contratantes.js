import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropDownComponent from './DropDownComponent';
import Modal from './components-contratantes/Modal';
import CreateContratanteForm from './components-contratantes/CreateContratanteForm';
import EditContratanteForm from './components-contratantes/EditContratanteForm';
import ConfirmDeleteModal from './components-contratantes/ConfirmDeleteModal';
import FinanceiroContratanteForm from './components-contratantes/FinanceiroContratanteForm';
import Logout from './Logout';
import SearchInput from './SearchInput';
import { useNavigate } from 'react-router-dom';
// import useContratantes from '../hooks/contratantes/useContratantes';

function Contratantes() {
    const navigate = useNavigate();
    const [contratantes, setContratantes] = useState([]);
    const [showFinanceiroModal, setShowFinanceiroModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentContratante, setCurrentContratante] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10; // Limite de itens por página

    useEffect(() => {
        const fetchContratantes = async (page, limit) => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/contratantes?page=${page}&limit=${limit}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setContratantes(response.data.contratantes);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError(err.message || 'Ocorreu algum erro ao buscar os contratantes.');
            }
        };

        fetchContratantes(currentPage, limit);
    }, [currentPage, limit]);

    
    const fetchContratantesByName = async (search = '') => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get(`http://localhost:8080/contratantes/all?search=${encodeURIComponent(search)}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setContratantes(response.data);
        } catch (error) {
            console.error('Erro ao buscar contratantes:', error);
            setError('Erro ao buscar contratantes');
        }
    };

    useEffect(() => {
        fetchContratantesByName();
    }, []);


    const createContratante = async (contratante) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/contratantes', contratante, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setContratantes([...contratantes, response.data]);
        } catch (err) {
            setError(err.message || 'Ocorreu algum erro ao criar o contratante.');
        }
    };

    const editContratante = async (id, contratante) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/contratantes/${id}`, contratante, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setContratantes(contratantes.map(c => (c.id === id ? response.data : c)));
        } catch (err) {
            setError(err.message || 'Ocorreu algum erro ao editar o contratante.');
        }
    };
    
    const deleteContratante = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/contratantes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setContratantes(contratantes.filter(c => c.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Ocorreu algum erro ao deletar o contratante.');
            alert(err.response?.data?.message || 'Ocorreu algum erro ao deletar o contratante.');
        }
    };

    const handleCreateSubmit = async (contratante) => {
        await createContratante(contratante);
        setShowCreateModal(false);
    };

    const handleEditSubmit = async (contratante) => {
        await editContratante(currentContratante.id, contratante);
        setShowEditModal(false);
        setCurrentContratante(null);
    };

    const handleEdit = (contratante) => {
        setCurrentContratante(contratante);
        setShowEditModal(true);
    };

    const handleDelete = (contratante) => {
        setCurrentContratante(contratante);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        await deleteContratante(currentContratante.id);
        setShowDeleteModal(false);
        setCurrentContratante(null);
    };
    
    const handleFinanceiro = (contratante) => {
        setCurrentContratante(contratante);
        setShowFinanceiroModal(true);
    };

    const handlePageChange = (event) => {
        const newPage = Number(event.target.value);
        setCurrentPage(newPage);
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h2>Menu</h2>
                <ul>
                    <li><a href="/postagens">Postagens</a></li>
                    <li><a href="/arbitros">Árbitros</a></li>
                    <li><a href="/contratantes">Contratantes</a></li>
                    <li><a href="/campeonatos">Campeonatos</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <DropDownComponent/>
                    <Logout />
                </ul>
            </div>
            <div className="main-table">
            <h2>Lista de Contratantes</h2>
            <div className="main-input-button">
            <button className="btn-open-modal" onClick={() => setShowCreateModal(true)}>Adicionar Contrantante</button>
            <SearchInput onSearch={fetchContratantesByName} />
            </div>
            {/* {error && <p>{error}</p>} */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Contato</th>
                        <th>Cidade</th>
                        <th>Financeiro</th>
                        <th>Operações</th>
                    </tr>
                </thead>
                <tbody>
                    {contratantes.map((contratante) => (
                        <tr key={contratante.id}>
                            <td>{contratante.id}</td>
                            <td>{contratante.nome}</td>
                            <td>{contratante.contato}</td>
                            <td>{contratante.cidade}</td>
                            <td>
                                    <button className="btn-financeiro" onClick={() => handleFinanceiro(contratante)}>📈</button>
                                </td>
                            <td>
                                <button className="btn-edit"
                                 onClick={() => handleEdit(contratante)}
                                 >✏️</button>
                                <button className="btn-delete"
                                 onClick={() => handleDelete(contratante)}
                                 >🗑️</button>
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

                {showFinanceiroModal && (
                <Modal onClose={() => setShowFinanceiroModal(false)}>
                    <FinanceiroContratanteForm 
                        contratante={currentContratante}
                        contratanteId={currentContratante?.id} 
                        onClose={() => setShowFinanceiroModal(false)} 
                    />
                </Modal>
            )}

             {showCreateModal && (
                <Modal onClose={() => setShowCreateModal(false)}>
                    <CreateContratanteForm
                     onSubmit={handleCreateSubmit} 
                     />
                </Modal>
            )}
            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <EditContratanteForm 
                    contratante={currentContratante} 
                    onSubmit={handleEditSubmit}
                     />
                </Modal>
            )}
            
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <ConfirmDeleteModal
                        contratante={currentContratante}
                        onConfirm={confirmDelete}
                        onCancel={() => setShowDeleteModal(false)}
                    />
                </Modal>
            )}
            </div>
        </div>
    );
}

export default Contratantes;
