import React, { useState, useEffect } from 'react';

function EditPostagemForm({ postagem, onSubmit, setPostagens }) {
    const [formData, setFormData] = useState({
        titulo: '',
        imagem: null,
        conteudo: '',
        tags: '',
        status: ''
    });

    useEffect(() => {
        if (postagem) {
            setFormData({
                ...postagem,
                tags: Array.isArray(postagem.tags) ? postagem.tags.join(', ') : postagem.tags // Garante que as tags sejam uma string separada por vírgulas
            });
        }
    }, [postagem]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (event) => {
        const newImage = event.target.files[0];
        setFormData({ ...formData, imagem: newImage });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Transformar a string de tags em um array
        const formattedData = {
            ...formData,
            tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
        };
        await onSubmit(formattedData);
        setPostagens(prevPostagens => prevPostagens.map(prevPostagem => prevPostagem._id === postagem._id ? formattedData : prevPostagem));
    };

    return (
        <div>
            <h2>Editar Postagem</h2>
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
                    accept="image/*"
                    placeholder="URL da Imagem"
                    onChange={handleImageChange}
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
                    placeholder="Status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="btn-submit">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default EditPostagemForm;