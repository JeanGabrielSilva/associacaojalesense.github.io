import React from 'react';
import '../css/modal.css';

function ConfirmDeletePostagemModal({ postagem, onConfirm, onCancel }) {
    return (
        <div className="confirm-delete-modal">
            <h2>Confirmar Exclusão</h2>
            <p>Você tem certeza que deseja excluir a postagem <strong>{postagem?.titulo}</strong>?</p>
            <div className="modal-buttons">
                <button className="btn-confirm" onClick={onConfirm}>Sim</button>
                <button className="btn-cancel" onClick={onCancel}>Não</button>
            </div>
        </div>
    );
}

export default ConfirmDeletePostagemModal;
