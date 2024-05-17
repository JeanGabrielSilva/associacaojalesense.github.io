import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DropDownComponent from './DropDownComponent'; 
import CreatePostagemForm from './components-postagem/CreatePostagemForm';
import EditPostagemForm from './components-postagem/EditPostagemForm';
import ConfirmDeleteModal from './components-postagem/ConfirmDeleteModal';
import Modal from './components-postagem/Modal';
import usePostagens from '../hooks/postagens/usePostagens';

function Postagens() {
    const {
        postagens,
        currentPage,
        totalPages,
        loading,
        error,
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
        editPostagem,
        deletePostagem,
    } = usePostagens();

    const navigate = useNavigate();
    const [setPostagens] = useState([]);

    const handleCreateSubmit = async (postagem) => {
        await createPostagem(postagem);
        setShowCreateModal(false);
    };
    
    const handleEditSubmit = async (postagem) => {
        await editPostagem(currentPostagem._id, postagem);
        setPostagens(postagens.map(a => (a._id === currentPostagem._id ? postagem : a)));
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
                    <li><a href="#arbitros">Árbitros</a></li>
                    <li><a href="#postagens">Postagens</a></li>
                    <li><a href="#contratantes">Contratantes</a></li>
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
                                <td>{postagem.imagem && <img src={postagem.imagem} alt={postagem.titulo} style={{ maxWidth: '100px' }} />}</td>
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
                    <EditPostagemForm postagem={currentPostagem} onSubmit={handleEditSubmit} />
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
