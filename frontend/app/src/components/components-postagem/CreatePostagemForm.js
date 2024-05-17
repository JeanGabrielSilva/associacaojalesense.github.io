import React, { useState } from 'react';

function CreatePostagemForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        titulo: '',
        imagem: null, // Alterado para null para armazenar o arquivo
        conteudo: '',
        tags: '',
        status: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, imagem: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Transformar a string de tags em um array
        const formattedData = {
            ...formData,
            tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
        };
        onSubmit(formattedData);
    };

    return (
        <div>
            <h2>Adicionar Nova Postagem</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="file"
                    name="imagem"
                    placeholder="Imagem"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <textarea
                    name="conteudo"
                    placeholder="Conteúdo"
                    className="input-conteudo"
                    value={formData.conteudo}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (separadas por vírgulas)"
                    value={formData.tags}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Status (Publicado, Rascunho)"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="btn-submit">Salvar</button>
            </form>
        </div>
    );
}

export default CreatePostagemForm;
