import { useState, useEffect } from 'react';
import axios from 'axios';

const usePostagens = () => {
    const [postagens, setPostagens] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPostagem, setCurrentPostagem] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const limit = 10;

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

    // const createPostagem = async (postagem) => {
    //     try {
    //         setLoading(true);
    //         const token = localStorage.getItem('token');
    //         await axios.post('http://localhost:8080/postagem', postagem, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         setShowCreateModal(false);
    //         fetchPostagens(currentPage);
    //         setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //         setError(error.message || 'Ocorreu algum erro ao criar a postagem.');
    //     }
    // };

    const createPostagem = async (postagem) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            const formData = new FormData();
            formData.append('titulo', postagem.titulo);
            formData.append('imagem', postagem.imagem); // Adiciona o arquivo de imagem
            formData.append('conteudo', postagem.conteudo);
            formData.append('tags', JSON.stringify(postagem.tags));
            formData.append('status', postagem.status);
    
            // Log para verificar o conteúdo do FormData
            for (let pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
    
            await axios.post('http://localhost:8080/postagem', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShowCreateModal(false);
            fetchPostagens(currentPage);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message || 'Ocorreu algum erro ao criar a postagem.');
            console.error('Erro ao criar postagem:', error);
        }
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
    
            setShowEditModal(false);
            setCurrentPostagem(null);
            fetchPostagens(currentPage);
        } catch (error) {
            console.error('Erro ao editar postagem:', error);
            setError(error.message || 'Ocorreu algum erro ao editar a postagem.');
        } finally {
            setLoading(false);
        }
    };
    

    // const editPostagem = async (id, postagem) => {
    //     try {
    //         setLoading(true);
    //         const token = localStorage.getItem('token')

    //         await axios.put(`http://localhost:8080/postagem/${id}`, postagem, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         setShowEditModal(false);
    //         setCurrentPostagem(null);
    //         fetchPostagens(currentPage);
    //         setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //         setError(error.message || 'Ocorreu algum erro ao editar a postagem.');
    //     }
    // };
    

    const deletePostagem = async (id) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/postagem/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPostagens(postagens.filter(a => a._id !== id));
            setShowDeleteModal(false);
            setCurrentPostagem(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message || 'Ocorreu algum erro ao excluir a postagem.');
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return {
        // postagens,
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
    };
};

export default usePostagens;
