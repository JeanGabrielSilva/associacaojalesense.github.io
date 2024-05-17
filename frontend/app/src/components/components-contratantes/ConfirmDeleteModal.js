import React from 'react';
import '../css/arbitros.css'
import '../css/modal.css'

function ConfirmDeleteModal({ contratante, onConfirm, onCancel }) {
    return (
        <div className="confirm-delete-modal">
            <h2>Confirmar Exclusão</h2>
            <p>Você tem certeza que deseja excluir o contratante <strong>{contratante?.nome}</strong>?</p>
            <div className="modal-buttons">
                <button className="btn-confirm" onClick={onConfirm}>Sim</button>
                <button className="btn-cancel" onClick={onCancel}>Não</button>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;
