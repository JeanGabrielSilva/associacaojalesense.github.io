import React, { useState } from 'react';
import './css/menu.css'

const DropDownComponent = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <li className="dropdown">
            <div className="dropdown-toggle" onClick={toggleDropdown}>Pagamentos</div>
            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <a href="/pagamentos-arbitros">Árbitros</a> 
                <a href="#pagamentos-contratantes">Contratantes</a>
            </div>
        </li>
    );
};

export default DropDownComponent;

