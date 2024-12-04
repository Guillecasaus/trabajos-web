"use client";

import { useState } from "react";
import ListaProyectos from "../../Components/ComponentesProyecto/ListaProyectos";
import DetallesProyecto from "../../Components/ComponentesProyecto/DetallesProyecto";
import Navbar from "../../Components/Navbar";
import Encabezado from "../../Components/Encabezado";

const ListaProyectosPage = () => {
  const [proyectoSeleccionadoId, setProyectoSeleccionadoId] = useState(null);

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
            <div className="w-1/3 border-r overflow-y-auto">
              <ListaProyectos onSelectProyecto={setProyectoSeleccionadoId} />
            </div>

            {/* Detalles del proyecto */}
            <div className="w-2/3 p-4 overflow-y-auto">
              {proyectoSeleccionadoId ? (
                <DetallesProyecto proyectoId={proyectoSeleccionadoId} />
              ) : (
                <p className="text-gray-500">Selecciona un proyecto para ver sus detalles.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListaProyectosPage;
