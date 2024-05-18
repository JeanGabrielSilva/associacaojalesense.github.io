import React from 'react';

function ConfirmDeleteModal({ campeonato, onConfirm, onCancel }) {
    return (
        <div className="confirm-delete-modal">
            <h2>Confirmar Exclusão</h2>
            <p>Você tem certeza que deseja excluir o campeonato <strong>{campeonato?.nome || 'Desconhecido'}</strong>?</p>
            <div className="modal-buttons">
                <button className="btn-confirm" onClick={onConfirm}>Sim</button>
                <button className="btn-cancel" onClick={onCancel}>Não</button>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;

