import React from 'react';
import '../css/postalModal.css';

const PostagemModal = ({ postagem, onClose }) => {
    if (!postagem) return null;

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    // Divide o conteúdo da postagem em parágrafos
    const paragrafoConteudo = postagem.conteudo.split('\n');


    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content-postagem">
                <button className="modal-close" onClick={onClose}>X</button>
                {postagem.imagem && <img src={`http://localhost:8080/${postagem.imagem}`} alt={postagem.titulo} style={{ maxWidth: '100px' }} className='modal-imagem' />}
                <h2>{postagem.titulo}</h2>
                {paragrafoConteudo.map((paragrafo, index) => (
                    <p key={index}>{paragrafo}</p>
                ))}
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