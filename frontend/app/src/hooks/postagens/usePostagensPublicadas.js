import { useState, useEffect } from 'react';
import axios from 'axios';

const usePostagensPublicadas = (page, limit = 3) => {
    const [postagens, setPostagens] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPostagens = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/portal?page=${page}&limit=${limit}`);
                setPostagens(response.data.postagens || []); // Certifique-se de que é um array
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Erro ao buscar postagens publicadas:', error);
                setError('Erro ao buscar postagens publicadas');
            }
        };

        fetchPostagens();
    }, [page, limit]);

    return { postagens, totalPages, error };
};

export default usePostagensPublicadas;
