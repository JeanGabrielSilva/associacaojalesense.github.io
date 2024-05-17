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

function Arbitros() {
    const navigate = useNavigate();
    const [arbitros, setArbitros] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 10; 
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentArbitro, setCurrentArbitro] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { createArbitro, editArbitro, deleteArbitro } = useArbitros();

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


    const handleEdit = (arbitro) => {
        setCurrentArbitro(arbitro);
        setShowEditModal(true);
    };

    const handleDelete = (arbitro) => {
        setCurrentArbitro(arbitro);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        await deleteArbitro(currentArbitro.id);
        setArbitros(arbitros.filter(a => a.id !== currentArbitro.id));
        setShowDeleteModal(false);
        setCurrentArbitro(null);
    };

    const handleCreateSubmit = async (arbitro) => {
        await createArbitro(arbitro);
        setShowCreateModal(false);
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

    return (
        <div className="container">
            <div className="sidebar">
                <h2>Menu</h2>
                <ul>
                    <li><a href="#arbitros">Postagens</a></li>
                    <li><a href="#postagens">Árbitros</a></li>
                    <li><a href="#contratantes">Contratantes</a></li>
                    <DropDownComponent/>
                </ul>
            </div>
            <div className="main-table">
                <h2>Lista de Árbitros</h2>
                <button className="btn-open-modal" onClick={() => setShowCreateModal(true)}>Adicionar Árbitro</button>
                {error && <p>{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Email</th>
                            <th>Telefone</th>
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
                    />
                </Modal>
            )}
        </div>
    );
}

export default Arbitros;