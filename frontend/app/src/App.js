import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import HomeAdmin from './components/HomeAdmin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Login />
      {/* / <HomeAdmin /> para conseguir visualizar a home do administrador*/}
      </header>
    </div>
  );
}

export default App;
