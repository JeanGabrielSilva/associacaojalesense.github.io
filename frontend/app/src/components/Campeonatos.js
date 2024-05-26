import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './components-campeonatos/Modal';
import CreateCampeonatoForm from './components-campeonatos/CreateCampeonatoForm';
import EditCampeonatoForm from './components-campeonatos/EditCampeonatoForm';
import ConfirmDeleteModal from './components-campeonatos/ConfirmDeleteModal';
import DropDownComponent from './DropDownComponent';
import Logout from './Logout';

function Campeonatos() {
    const [campeonatos, setCampeonatos] = useState([]);
    const [contratantes, setContratantes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const limit = 10;
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentCampeonato, setCurrentCampeonato] = useState(null);

    const fetchCampeonatos = async (page = 1) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/campeonatos?page=${page}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCampeonatos(data.campeonatos);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        } catch (error) {
            console.error("Erro ao buscar campeonatos:", error);
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
        fetchCampeonatos(currentPage);
        fetchContratantes();
    }, [currentPage]);

    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.value));
    };

    const handleCreateSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/campeonatos', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const novoCampeonato = response.data;
            const campeonatoAtualizadoResponse = await axios.get(`http://localhost:8080/campeonatos/${novoCampeonato.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const campeonatoAtualizado = campeonatoAtualizadoResponse.data;
            setCampeonatos([...campeonatos, campeonatoAtualizado]);
            setShowCreateModal(false);
        } catch (error) {
            console.error('Erro ao criar campeonato:', error);
            setError('Erro ao criar campeonato');
        }
    };

    const handleEditSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/campeonatos/${currentCampeonato.id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const campeonatoAtualizadoResponse = await axios.get(`http://localhost:8080/campeonatos/${currentCampeonato.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const campeonatoAtualizado = campeonatoAtualizadoResponse.data;
            setCampeonatos(campeonatos.map(c => (c.id === currentCampeonato.id ? campeonatoAtualizado : c)));
            setShowEditModal(false);
            setCurrentCampeonato(null);
        } catch (error) {
            console.error('Erro ao editar campeonato:', error);
            setError('Erro ao editar campeonato');
        }
    };

    const handleEdit = (campeonato) => {
        setCurrentCampeonato(campeonato);
        setShowEditModal(true);
    };

    const handleDelete = (campeonato) => {
        setCurrentCampeonato(campeonato);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/campeonatos/${currentCampeonato.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCampeonatos(campeonatos.filter(c => c.id !== currentCampeonato.id));
            setShowDeleteModal(false);
            setCurrentCampeonato(null);
        } catch (error) {
            console.error('Erro ao deletar campeonato:', error);
            setError('Erro ao deletar campeonato');
        }
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
                    <DropDownComponent />
                    <Logout />
                </ul>
            </div>
            <div className="main-table">
                <h2>Lista de Campeonatos</h2>
                <button className="btn-open-modal" onClick={() => setShowCreateModal(true)}>Adicionar Campeonato</button>
                {error && <p>{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Contratante</th>
                            <th>Instituição</th>
                            <th>Status</th>
                            <th>Operações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campeonatos.map((campeonato) => (
                            <tr key={campeonato.id}>
                                <td>{campeonato.id}</td>
                                <td>{campeonato.nome}</td>
                                <td>{campeonato.contratante?.nome || 'Desconhecido'}</td>
                                <td>{campeonato.instituicao}</td>
                                <td>{campeonato.status}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => handleEdit(campeonato)}>✏️</button>
                                    <button className="btn-delete" onClick={() => handleDelete(campeonato)}>🗑️</button>
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
                    <CreateCampeonatoForm
                        contratantes={contratantes}
                        onSubmit={handleCreateSubmit}
                    />
                </Modal>
            )}
            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <EditCampeonatoForm
                        campeonato={currentCampeonato}
                        contratantes={contratantes}
                        onSubmit={handleEditSubmit}
                    />
                </Modal>
            )}
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <ConfirmDeleteModal
                        campeonato={currentCampeonato}
                        onConfirm={confirmDelete}
                        onCancel={() => setShowDeleteModal(false)}
                        error={error}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Campeonatos;
