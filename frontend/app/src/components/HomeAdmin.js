import React from 'react';
import '../Sidebar.css'; // Importando o arquivo de estilos CSS para o menu lateral
import Logo from "../img/logo_projeto.jpg";

function HomeAdmin() {
  return (
    <div className="container">
      <div className="sidebar">
        <img src={Logo} alt="Logo" />
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Publicação</a></li>
          <li><a href="#">Árbitros</a></li>
          <li><a href="#">Financeiro</a></li>
          <li><a href="#">Relatório</a></li>
        </ul>
      </div>
      <div className="main-content">
      <div className="square-container">
        <div className="square">15</div>
        <div className="square">2</div>
        <div className="square">3</div>
        <div className="square">4</div>
        <div className="square">5</div>
        <div className="square">6</div>
      </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
