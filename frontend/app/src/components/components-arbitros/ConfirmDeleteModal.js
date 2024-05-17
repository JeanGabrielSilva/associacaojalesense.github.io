import React from 'react';
import '../css/modal.css';

function ConfirmDeleteModal({ arbitro, onConfirm, onCancel, error }) {
    return (
        <div className="confirm-delete-modal">
            <h2>Confirmar Exclusão</h2>
            <p>Você tem certeza que deseja excluir o árbitro <strong>{arbitro?.nome}</strong>?</p>
            {error && <div className="error-message">{error}</div>}
            <div className="modal-buttons">
                <button className="btn-confirm" onClick={onConfirm}>Sim</button>
                <button className="btn-cancel" onClick={onCancel}>Não</button>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;
