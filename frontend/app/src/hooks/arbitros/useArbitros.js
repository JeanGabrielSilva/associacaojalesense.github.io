import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useArbitros = () => {
    // const [totalPages, setTotalPages] = useState(1);
    // const [currentPage, setCurrentPage] = useState(page);
    // const navigate = useNavigate();
    const [arbitros, setArbitros] = useState([]);
    const [error, setError] = useState('');

    // useEffect(() => {
    //     const fetchArbitros = async () => {
    //         const token = localStorage.getItem('token');
    //         if (!token) {
    //             navigate('/login');
    //             return;
    //         }

    //         try {
    //             const response = await axios.get('http://localhost:8080/arbitros', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });
    //             setArbitros(response.data);
    //         } catch (error) {
    //             console.error('Erro ao buscar árbitros:', error);
    //             setError('Erro ao buscar árbitros');
    //         }
    //     };

    //     fetchArbitros();
    // }, [navigate]);

    const createArbitro = async (arbitro) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:8080/arbitros', arbitro, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setArbitros([...arbitros, response.data]);
        } catch (error) {
            console.error('Erro ao criar árbitro:', error);
            setError('Erro ao criar árbitro');
        }
    };

    const editArbitro = async (id, arbitro) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:8080/arbitros/${id}`, arbitro, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setArbitros(arbitros.map(a => (a.id === id ? response.data : a)));
        } catch (error) {
            console.error('Erro ao editar árbitro:', error);
            setError('Erro ao editar árbitro');
        }
    };

    const deleteArbitro = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado');
        }

        try {
            const response = await axios.delete(`http://localhost:8080/arbitros/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setArbitros(arbitros.filter(arbitro => arbitro.id !== id));
            } else {
                throw new Error(response.data.message || 'Erro ao excluir árbitro');
            }
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    };

    return {
        arbitros,
        error,
        createArbitro,
        editArbitro,
        deleteArbitro
    };
};

export default useArbitros;
