import React, { useState, useEffect } from 'react';

function EditPostagemForm({ postagem, onSubmit }) {
    const [formData, setFormData] = useState({
        titulo: '',
        imagem: '',
        conteudo: '',
        tags: '',
        status: ''
    });

    useEffect(() => {
        if (postagem) {
            setFormData({
                ...postagem,
                tags: postagem.tags.join(', ') // Converte o array de tags em uma string separada por vírgulas
            });
        }
    }, [postagem]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Transformar a string de tags de volta em um array
        const formattedData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim())
        };
        onSubmit(formattedData);
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
                    type="text"
                    name="imagem"
                    placeholder="URL da Imagem"
                    value={formData.imagem}
                    onChange={handleInputChange}
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
