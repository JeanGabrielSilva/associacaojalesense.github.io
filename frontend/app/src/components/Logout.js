import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); 
    };

    return (
        <li>
            <a onClick={handleLogout} className="btn-logout">
                Logout
            </a>
        </li>
    );
}

export default Logout;
