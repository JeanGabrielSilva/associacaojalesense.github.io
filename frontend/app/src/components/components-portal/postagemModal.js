import React from 'react';
import '../css/postalModal.css'

const PostagemModal = ({ postagem, onClose }) => {
    if (!postagem) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                {postagem.imagem && <img src={postagem.imagem} alt={postagem.titulo} className="modal-imagem" />}
                <h2>{postagem.titulo}</h2>
                <p>{postagem.conteudo}</p>
                <div className="modal-tags">
                    {postagem.tags.map((tag, index) => (
                        <span key={index} className="modal-tag">{tag}</span>
                    ))}
                </div>
                <p className="modal-data">{new Date(postagem.createAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default PostagemModal;
