import logo from './logo.svg';
import './App.css';
import './mascotas.css';
import './filtro.css';
import React from 'react';
import Filtros from './Components/filter'; 
import FormSolicitud from './Components/formularioSolicitud'; 
import ListaMascotas from './Components/lista'; 
import useAdopcion from './Components/adoption'; 

function App() {
  const {
    mascotas,
    filtros,
    mascotaSeleccionada,
    aplicarFiltros,
    seleccionarMascota,
  } = useAdopcion();

  return (
    <div className="App">
      <h1>¡Adopta un amigo peludo!</h1>
      <Filtros aplicarFiltros={aplicarFiltros} />

      <ListaMascotas
        mascotas={mascotas}
        filtros={filtros}
        seleccionarMascota={seleccionarMascota}
      />

      {mascotaSeleccionada && <FormSolicitud mascota={mascotaSeleccionada} />}
    </div>
  );
}

export default App;
