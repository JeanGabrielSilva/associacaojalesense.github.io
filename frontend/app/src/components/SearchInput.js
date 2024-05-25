
import React, { useState, useEffect } from 'react';

const SearchInput = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(query);
        }, 300); // 300ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    return (
        <input
            type="text"
            className="busca-input"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
};

export default SearchInput;