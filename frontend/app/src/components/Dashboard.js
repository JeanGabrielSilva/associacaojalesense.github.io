import React, { useState, useEffect } from 'react';
import DropDownComponent from './DropDownComponent';
import Logout from './Logout';

function Dashboard() {
    return (
        <div className="container">
            <div className="sidebar">
                <h2>Menu</h2>
                <ul>
                    <li><a href="/postagens">Postagens</a></li>
                    <li><a href="/arbitros">Árbitros</a></li>
                    <li><a href="/contratantes">Contratantes</a></li>
                    <li><a href="/campeonatos">Campeonatos</a></li>
                    <DropDownComponent />
                    <Logout />
                </ul>
            </div>
            <div className="main-table">
                <h2>Lista de dashboard</h2>
    
                <div className="dashboardLink">
                    
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
