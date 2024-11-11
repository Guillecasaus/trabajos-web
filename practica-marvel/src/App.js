import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaComics from './components/listaComics';
import DetallesPersonaje from './components/DetallesPersonaje';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className='title'>Cómics de Marvel</h1>
        <Routes>
          <Route path="/" element={<ListaComics />} />
          <Route path="/characters/:id" element={<DetallesPersonaje />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
