import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DropDownComponent from './DropDownComponent'; 
import CreatePostagemForm from './components-postagem/CreatePostagemForm';
import EditPostagemForm from './components-postagem/EditPostagemForm';
import ConfirmDeleteModal from './components-postagem/ConfirmDeleteModal';
import Modal from './components-postagem/Modal';
import usePostagens from '../hooks/postagens/usePostagens';
import Logout from './Logout';

function Postagens() {
    const {
        currentPage,
        currentPostagem,
        showCreateModal,
        showEditModal,
        showDeleteModal,
        setShowCreateModal,
        setShowEditModal,
        setShowDeleteModal,
        setCurrentPostagem,
        handlePageChange,
    } = usePostagens();

    const navigate = useNavigate();
    const limit = 10;
    const [postagens, setPostagens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPostagens(currentPage);
    }, [currentPage]);

    const fetchPostagens = async (page) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/postagem?page=${page}&limit=${limit}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPostagens(response.data.postagens || []);
            setTotalPages(response.data.totalPages || 0);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message || 'Ocorreu algum erro ao buscar postagens.');
        }
    };

    const handleCreateSubmit = async (postagem) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('titulo', postagem.titulo);
            formData.append('imagem', postagem.imagem);
            formData.append('conteudo', postagem.conteudo);
            // formData.append('tags', postagem.tags.join(', '));
            formData.append('tags', JSON.stringify(postagem.tags));
            formData.append('status', postagem.status);

            const response = await axios.post('http://localhost:8080/postagem', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPostagens([...postagens, response.data]);
            setShowCreateModal(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message || 'Ocorreu algum erro ao criar a postagem.');
            console.error('Erro ao criar postagem:', error);
        }
    };

    
    const handleEditSubmit = async (postagem) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('titulo', postagem.titulo);
            formData.append('imagem', postagem.imagem);
            formData.append('conteudo', postagem.conteudo);
            formData.append('tags', postagem.tags.join(', '));
            // formData.append('tags', JSON.stringify(postagem.tags));
            formData.append('status', postagem.status);

            const response = await axios.put(`http://localhost:8080/postagem/${currentPostagem._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setPostagens(postagens.map(p => (p._id === currentPostagem._id ? response.data : p)));
            setShowEditModal(false);
            setCurrentPostagem(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message || 'Ocorreu algum erro ao editar a postagem.');
            console.error('Erro ao editar postagem:', error);
        }
    };

    const handleEdit = (postagem) => {
        setCurrentPostagem(postagem);
        setShowEditModal(true);
    };
    const handleDelete = (postagem) => {
        setCurrentPostagem(postagem);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/postagem/${currentPostagem._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPostagens(postagens.filter(p => p._id !== currentPostagem._id));
            setShowDeleteModal(false);
            setCurrentPostagem(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message || 'Ocorreu algum erro ao excluir a postagem.');
            console.error('Erro ao excluir postagem:', error);
        }
    };

    const truncateText = (text, length) => {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
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
                <h2>Postagens</h2>
                <button className="btn-open-modal" onClick={() => setShowCreateModal(true)}>Adicionar postagem</button>
                {loading ? <p>Carregando...</p> : null}
                {error && <p>{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Imagem</th>
                            <th>Conteúdo</th>
                            <th>Tags</th>
                            <th>Status</th>
                            <th>Operações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postagens.map((postagem) => (
                            <tr key={postagem._id}>
                                <td>{postagem._id}</td>
                                <td>{postagem.titulo}</td>
                                <td>{postagem.imagem && <img src={`http://localhost:8080/${postagem.imagem}`} alt={postagem.titulo} style={{ maxWidth: '100px', maxHeight: '200%' }} />}</td>
                                <td>{truncateText(postagem.conteudo, 25)}</td>
                                {/* <td>{postagem.tags.join(', ')}</td>                            */}
                                {/* <td>
                                    <div className="postagem-tags">
                                        {Array.isArray(postagem.tags) ? postagem.tags.map((tag, index) => (
                                            <span key={index} className="postagem-tag">{tag}</span>
                                        )) : JSON.parse(postagem.tags).map((tag, index) => (
                                            <span key={index} className="postagem-tag">{tag}</span>
                                        ))}
                                    </div>
                                </td> */}
                                {/* <td>
                                    <div className="postagem-tags">
                                        {Array.isArray(postagem.tags) ? postagem.tags.map((tag, index) => (
                                            <span key={index} className="postagem-tag">{tag}</span>
                                        )) : postagem.tags.split(',').map((tag, index) => (
                                            <span key={index} className="postagem-tag">{tag.trim()}</span>
                                        ))}
                                    </div>
                                </td> */}

                                <td>
                                    <div className="postagem-tags">
                                        {postagem.tags.map((tag, index) => (
                                            <span key={index} className="postagem-tag">{tag}</span>
                                        ))}
                                    </div>
                                </td>  
                                <td>{postagem.status}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => handleEdit(postagem)}>✏️</button>
                                    <button className="btn-delete" onClick={() => handleDelete(postagem)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <select value={currentPage} onChange={(e) => handlePageChange(Number(e.target.value))}>
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
                    <CreatePostagemForm onSubmit={handleCreateSubmit} />
                </Modal>
            )}
            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <EditPostagemForm postagem={currentPostagem} onSubmit={handleEditSubmit} setPostagens={setPostagens} />
                </Modal>
            )}
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <ConfirmDeleteModal
                        postagem={currentPostagem}
                        onConfirm={confirmDelete}
                        onCancel={() => setShowDeleteModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Postagens;


