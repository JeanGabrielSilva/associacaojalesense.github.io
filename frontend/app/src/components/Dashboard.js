import React from 'react';
import DropDownComponent from './DropDownComponent';
import Logout from './Logout';
import LookerGraph from './LookerGraph'; // Importe o componente do gráfico

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
                    <li><a href="/dashboard">Dashboard</a></li>
                    <DropDownComponent />
                    <Logout />
                </ul>
            </div>
            <div className="main-table">
                <LookerGraph /> {/* Adicione o componente do gráfico aqui */}
            </div>
            
        </div>
    );
}

export default Dashboard;
