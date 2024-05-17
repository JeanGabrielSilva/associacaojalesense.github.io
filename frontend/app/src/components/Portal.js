import React, { useState } from 'react';
import usePostagensPublicadas from '../hooks/postagens/usePostagensPublicadas';
import PostagemModal from './components-portal/postagemModal';
import './css/portal.css';

const Portal = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { postagens, totalPages, error } = usePostagensPublicadas(currentPage, 3);    
    const [selectedPostagem, setSelectedPostagem] = useState(null);

    if (error) {
        return <div>{error}</div>;
    }

    const handlePostagemClick = (postagem) => {
        setSelectedPostagem(postagem);
    };

    const handleCloseModal = () => {
        setSelectedPostagem(null);
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
                    <li><a href="#arbitros">Publicações</a></li>
                    <li><a href="#sobre">Sobre nós</a></li>
                </ul>
            </div>
            <div className="portal">
                <h2>Postagens Publicadas</h2>
                <div className="postagens-grid">
                    {Array.isArray(postagens) && postagens.map((postagem) => (
                        <div key={postagem._id} className="postagem-card" onClick={() => handlePostagemClick(postagem)}>
                            {postagem.imagem && <img src={postagem.imagem} alt={postagem.titulo} className="postagem-imagem" />}
                            <h3>{postagem.titulo}</h3>
                            <p>{postagem.conteudo.substring(0, 100)}...</p>
                            <div className="postagem-tags">
                                {postagem.tags.map((tag, index) => (
                                    <span key={index} className="postagem-tag">{tag}</span>
                                ))}
                            </div>
                            <p className="postagem-data">{new Date(postagem.createAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <select value={currentPage} onChange={handlePageChange}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                Página {index + 1}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedPostagem && (
                    <PostagemModal postagem={selectedPostagem} onClose={handleCloseModal} />
                )}
            </div>
        </div>
    );
};

export default Portal;
