import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/main.css'
import { useNavigate } from 'react-router-dom';
import DropDownComponent from './DropDownComponent';
import useArbitros from '../hooks/arbitros/useArbitros';
import Modal from './components-arbitros/Modal';
import CreateArbitroForm from './components-arbitros/CreateArbitroForm';
import EditArbitroForm from './components-arbitros/EditArbitroForm';
import ConfirmDeleteModal from './components-arbitros/ConfirmDeleteModal';
import FinanceiroArbitroForm from './components-arbitros/FinanceiroArbitroForm';
import Logout from './Logout';
import SearchInput from './SearchInput';

function Arbitros() {
    const navigate = useNavigate();
    const [arbitros, setArbitros] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 10; 
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFinanceiroModal, setShowFinanceiroModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentArbitro, setCurrentArbitro] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { editArbitro, deleteArbitro } = useArbitros();

    useEffect(() => {
        const fetchArbitros = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/arbitros?page=${page}&limit=${limit}`, {
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

        fetchArbitros();
    }, [navigate, page, limit]);

   
    const fetchArbitrosByName = async (search = '') => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get(`http://localhost:8080/arbitros/all?search=${encodeURIComponent(search)}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setArbitros(response.data);
        } catch (error) {
            console.error('Erro ao buscar árbitros:', error);
            setError('Erro ao buscar árbitros');
        }
    };

    // Hook para buscar árbitros ao montar o componente
    useEffect(() => {
        fetchArbitrosByName();
    }, []);


    const handleEdit = (arbitro) => {
        setCurrentArbitro(arbitro);
        setShowEditModal(true);
    };

    const handleDelete = (arbitro) => {
        setCurrentArbitro(arbitro);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteArbitro(currentArbitro.id);
            setArbitros(arbitros.filter(a => a.id !== currentArbitro.id));
            setShowDeleteModal(false);
            setCurrentArbitro(null);
        } catch (error) {
            console.error('Erro ao excluir árbitro:', error);
            window.alert(error.message);
        }
    };

    const handleCreateSubmit = async (arbitro) => {
        try {
            await createArbitro(arbitro);
            setShowCreateModal(false);
        } catch (error) {
            console.error('Erro ao criar árbitro:', error);
            window.alert(error.message); 
        }
    };

    const createArbitro = async (arbitro) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:8080/arbitros', arbitro, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setArbitros(prevArbitros => [...prevArbitros, response.data]);
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    };

    const handleEditSubmit = async (arbitro) => {
        await editArbitro(currentArbitro.id, arbitro);
        setArbitros(arbitros.map(a => (a.id === currentArbitro.id ? arbitro : a)));
        setShowEditModal(false);
        setCurrentArbitro(null);
    };

    const handlePageChange = (event) => {
        const newPage = Number(event.target.value);
        setPage(newPage);
        setCurrentPage(newPage);
    };

    const handleFinanceiro = (arbitro) => {
        setCurrentArbitro(arbitro);
        setShowFinanceiroModal(true);
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
                <h2>Lista de Árbitros</h2>
                <div className="main-input-button">
                <button className="btn-open-modal" onClick={() => setShowCreateModal(true)}>Adicionar Árbitro</button>
                <SearchInput onSearch={fetchArbitrosByName} />
                </div>
                {error && <p>{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Financeiro</th>
                            <th>Operações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arbitros.map((arbitro) => (
                            <tr key={arbitro.id}>
                                <td>{arbitro.id}</td>
                                <td>{arbitro.nome}</td>
                                <td>{arbitro.idade}</td>
                                <td>{arbitro.email}</td>
                                <td>{arbitro.telefone}</td>
                                <td>
                                    <button className="btn-financeiro" onClick={() => handleFinanceiro(arbitro)}>📈</button>
                                </td>
                                <td>
                                    <button className="btn-edit" onClick={() => handleEdit(arbitro)}>✏️</button>
                                    <button className="btn-delete" onClick={() => handleDelete(arbitro)}>🗑️</button>
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
            </div>
            {showFinanceiroModal && (
                <Modal onClose={() => setShowFinanceiroModal(false)}>
                    <FinanceiroArbitroForm 
                        arbitro={currentArbitro}
                        arbitroId={currentArbitro?.id} 
                        onClose={() => setShowFinanceiroModal(false)} 
                    />
                </Modal>
            )}

            {showCreateModal && (
                <Modal onClose={() => setShowCreateModal(false)}>
                    <CreateArbitroForm onSubmit={handleCreateSubmit} />
                </Modal>
            )}
            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <EditArbitroForm arbitro={currentArbitro} onSubmit={handleEditSubmit} />
                </Modal>
            )}
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <ConfirmDeleteModal
                        arbitro={currentArbitro}
                        onConfirm={confirmDelete}
                        onCancel={() => setShowDeleteModal(false)}
                        error={error}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Arbitros;
