"use client";

import { useState } from "react";
import ListaProyectos from "../../Components/ComponentesProyecto/ListaProyectos";
import DetallesProyecto from "../../Components/ComponentesProyecto/DetallesProyecto";
import ActualizarProyecto from "../../Components/ComponentesProyecto/ActualizarProyecto";
import Navbar from "../../Components/Navbar";
import Encabezado from "../../Components/Encabezado";

const ListaProyectosPage = () => {
  const [proyectoSeleccionadoId, setProyectoSeleccionadoId] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const handleProyectoActualizado = (proyectoActualizado) => {
    alert("Proyecto actualizado: " + proyectoActualizado.name);
    setModoEdicion(false);
  };

  return (
    <>
      <Encabezado tituloPagina="Proyectos" />
      <div className="flex h-screen">
        <div className="w-64 flex-shrink-0">
          <Navbar />
        </div>

        <div className="flex-grow flex flex-col">
          <div className="flex flex-grow">
            <div className="w-1/3 border-r overflow-y-auto">
              <ListaProyectos onSelectProyecto={setProyectoSeleccionadoId} />
            </div>

            <div className="w-2/3 p-4 overflow-y-auto">
              {proyectoSeleccionadoId ? (
                modoEdicion ? (
                  <ActualizarProyecto
                    proyectoId={proyectoSeleccionadoId}
                    onProyectoActualizado={handleProyectoActualizado}
                  />
                ) : (
                  <div>
                    <DetallesProyecto proyectoId={proyectoSeleccionadoId} />
                    <button
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => setModoEdicion(true)}
                    >
                      Editar Proyecto
                    </button>
                  </div>
                )
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
