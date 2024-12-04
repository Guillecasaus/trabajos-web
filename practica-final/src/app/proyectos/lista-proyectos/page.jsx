"use client";

import ListaProyectos from "../../Components/ListaProyectos";
import Navbar from "../../Components/Navbar";
import Encabezado from "../../Components/Encabezado";

const ListaProyectosPage = () => {
  return (
    <>
      <Encabezado tituloPagina="Proyectos" />
      <div className="flex h-screen">
        {/* Navbar ocupa su espacio fijo */}
        <div className="w-64 flex-shrink-0">
          <Navbar />
        </div>

        {/* Contenido principal */}
        <div className="flex-grow flex flex-col">
          <div className="flex flex-grow">
            {/* Lista de proyectos */}
            <div className="w-full p-4 overflow-y-auto">
              <ListaProyectos />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListaProyectosPage;
