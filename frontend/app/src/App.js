import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Arbitros from './components/Arbitros';
import PagamentoArbitros from './components/PagamentoArbitros';
import Portal from './components/Portal';
import Contratantes from './components/Contratantes';
import Postagens from './components/Postagens';
import PagamentoContratantes from './components/PagamentoContratantes';
import Campeonatos from './components/Campeonatos';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/arbitros" element={<Arbitros />} />
            <Route path="/pagamentos-arbitros" element={<PagamentoArbitros/>}/>
            <Route path="/contratantes" element={<Contratantes/>}/>
            <Route path="/pagamentos-contratantes" element={<PagamentoContratantes/>}/>
            <Route path="/campeonatos" element={<Campeonatos/>}/>
            <Route path="/portal" element={<Portal/>}/>
            <Route path="/postagens" element={<Postagens/>}/>
          </Routes>
        </header>
      </div>
    </Router>
  //   <Router>
  //   <div className="App">
  //     <header className="App-header">
  //       <nav>
  //         <ul>
  //           <li>
  //             <Link to="/login">Login</Link>
  //           </li>
  //           <li>
  //             <Link to="/arbitros">Árbitros</Link>
  //           </li>
  //         </ul>
  //       </nav>
  //       <Routes>
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/arbitros" element={<Arbitros />} />
  //       </Routes>
  //     </header>
  //   </div>
  // </Router>
  )
}

export default App;
