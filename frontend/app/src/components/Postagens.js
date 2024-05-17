import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DropDownComponent from './DropDownComponent'; 
import CreatePostagemForm from './components-postagem/CreatePostagemForm';
import EditPostagemForm from './components-postagem/EditPostagemForm';
import ConfirmDeleteModal from './components-postagem/ConfirmDeleteModal';
import Modal from './components-postagem/Modal';
import usePostagens from '../hooks/postagens/usePostagens';

function Postagens() {
    const {
        // postagens,
        currentPage,
        // totalPages,
        // loading,
        // error,
        currentPostagem,
        showCreateModal,
        showEditModal,
        showDeleteModal,
        setShowCreateModal,
        setShowEditModal,
        setShowDeleteModal,
        setCurrentPostagem,
        handlePageChange,
        createPostagem,
        // editPostagem,
        deletePostagem,
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
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
        await createPostagem(postagem);
        setShowCreateModal(false);
    };

    
    
    const editPostagem = async (id, postagem) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('titulo', postagem.titulo);
            formData.append('imagem', postagem.imagem); // Adiciona a nova imagem
            formData.append('conteudo', postagem.conteudo);
            formData.append('tags', JSON.stringify(postagem.tags));
            formData.append('status', postagem.status);
    
            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]); 
            }
    
            const response = await axios.put(`http://localhost:8080/postagem/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log('Resposta do servidor:', response.data);
    
            // Atualize a lista de postagens após a edição
            setPostagens(prevPostagens => prevPostagens.map(prevPostagem => prevPostagem._id === id ? response.data : prevPostagem));
    
            setShowEditModal(false);
            setCurrentPostagem(null);
        } catch (error) {
            console.error('Erro ao editar postagem:', error);
            setError(error.message || 'Ocorreu algum erro ao editar a postagem.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditSubmit = async (postagem) => {
        await editPostagem(currentPostagem._id, postagem);
        setShowEditModal(false);
        setCurrentPostagem(null);
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
        await deletePostagem(currentPostagem._id);
        setShowDeleteModal(false);
        setCurrentPostagem(null);
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
                    <li><a href="/arbitros">Árbitros</a></li>
                    <li><a href="/postagens">Postagens</a></li>
                    <li><a href="/contratantes">Contratantes</a></li>
                    <DropDownComponent />
                </ul>
            </div>
            <div className="main-table">
                <h2>Postagens</h2>
                <button className="btn-open-modal" onClick={() => setShowCreateModal(true)}>Adicionar postagem</button>
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
                                <td>{postagem.imagem && <img src={`http://localhost:8080/${postagem.imagem}`} alt={postagem.titulo} style={{ maxWidth: '100px' }} />}</td>
                                {/* <td>{postagem.imagem && <img src={postagem.imagem} alt={postagem.titulo} style={{ maxWidth: '100px' }} />}</td> */}
                                <td>{truncateText(postagem.conteudo, 25)}</td>
                                <td>{postagem.tags.join(', ')}</td>
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
                    {/* <EditPostagemForm postagem={currentPostagem} onSubmit={handleEditSubmit} /> */}
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
