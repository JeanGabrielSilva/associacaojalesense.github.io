import React, { useState } from 'react';
import DropDownComponent from './DropDownComponent';
import Modal from './components-contratantes/Modal';
import CreateContratanteForm from './components-contratantes/CreateContratanteForm';
import EditContratanteForm from './components-contratantes/EditContratanteForm';
import ConfirmDeleteModal from './components-arbitros/ConfirmDeleteModal';
import useContratantes from '../hooks/contratantes/useContratantes';

function Contratantes() {
    // const { contratantes, error, createContratante, editContratante, deleteContratante } = useContratantes();
    const [showCreateModal, setShowCreateModal] = useState(false);
    // const [showEditModal, setShowEditModal] = useState(false);
    // const [currentContratante, setCurrentContratante] = useState(null);
    // const [showDeleteModal, setShowDeleteModal] = useState(false);

    // const handleEdit = (contratantes) => {
    //     setCurrentContratante(contratantes);
    //     setShowEditModal(true);
    // };

    // const handleDelete = (contratantes) => {
    //     setCurrentContratante(contratantes);
    //     setShowDeleteModal(true);
    // };

    // const confirmDelete = async () => {
    //     await deleteContratante(currentContratante.id);
    //     setShowDeleteModal(false);
    //     setCurrentContratante(null);
    // };

    // const handleCreateSubmit = async (contratantes) => {
    //     await createContratante(contratantes);
    //     setShowCreateModal(false);
    // };

    // const handleEditSubmit = async (contratantes) => {
    //     await editContratante(currentContratante.id, contratantes);
    //     setShowEditModal(false);
    //     setCurrentContratante(null);
    // };

    return (
        <div className="container">
            <div className="sidebar">
                <h2>Menu</h2>
                <ul>
                    <li><a href="#arbitros">Postagens</a></li>
                    <li><a href="#postagens">Árbitros</a></li>
                    <li><a href="#contratantes">Contratantes</a></li>
                    <DropDownComponent/>
                </ul>
            </div>
            <div className="main-table">
            <h2>Lista de Contratantes</h2>
            <button className="btn-open-modal" onClick={() => setShowCreateModal(true)}>Adicionar Contrantante</button>
            {/* {error && <p>{error}</p>} */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Contato</th>
                        <th>Cidade</th>
                        <th>Operações</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {contratantes.map((contratante) => (
                        <tr key={contratante.id}>
                            <td>{contratante.id}</td>
                            <td>{contratante.nome}</td>
                            <td>{contratante.contato}</td>
                            <td>{contratante.cidade}</td>
                            <td>
                                <button className="btn-edit" onClick={() => handleEdit(contratante)}>✏️</button>
                                <button className="btn-delete" onClick={() => handleDelete(contratante)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody> */}
            </table>

            {/* {showCreateModal && (
                <Modal onClose={() => setShowCreateModal(false)}>
                    <CreateContratanteForm onSubmit={handleCreateSubmit} />
                </Modal>
            )}

            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <EditContratanteForm arbitro={currentContratante} onSubmit={handleEditSubmit} />
                </Modal>
            )}

            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <ConfirmDeleteModal
                        contratante={currentContratante}
                        onConfirm={confirmDelete}
                        onCancel={() => setShowDeleteModal(false)}
                    />
                </Modal>
            )} */}
            </div>
        </div>
    );
}

export default Contratantes;
