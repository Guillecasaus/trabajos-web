"use client";

import { useState } from "react";
import ListaClientes from "../../Components/ComponentesCliente/ListaClientes";
import DetallesCliente from "../../Components/ComponentesCliente/DetallesCliente";
import ActualizarCliente from "../../Components/ComponentesCliente/ActualizarCliente"; // Importar el nuevo componente
import Navbar from "../../Components/Navbar";
import Encabezado from "../../Components/Encabezado";

const ListaClientesPage = () => {
  const [clienteSeleccionadoId, setClienteSeleccionadoId] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false); // Para alternar entre vista y edición

  const handleClienteActualizado = (clienteActualizado) => {
    alert("Cliente actualizado: " + clienteActualizado.name);
    setModoEdicion(false); // Salir del modo de edición tras la actualización
  };

  return (
    <>
      <Encabezado tituloPagina="Clientes" />
      <div className="flex h-screen">
        {/* Navbar ocupa su espacio fijo */}
        <div className="w-64 flex-shrink-0">
          <Navbar />
        </div>

        {/* Contenido principal */}
        <div className="flex-grow flex flex-col">
          <div className="flex flex-grow">
            {/* Lista de clientes */}
            <div className="w-1/3 border-r overflow-y-auto">
              <ListaClientes onSelectCliente={setClienteSeleccionadoId} />
            </div>

            {/* Detalles o edición del cliente */}
            <div className="w-2/3 p-4 overflow-y-auto">
              {clienteSeleccionadoId ? (
                modoEdicion ? (
                  <ActualizarCliente
                    clienteId={clienteSeleccionadoId}
                    onClienteActualizado={handleClienteActualizado}
                  />
                ) : (
                  <div>
                    <DetallesCliente clienteId={clienteSeleccionadoId} />
                    <button
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => setModoEdicion(true)} // Activar modo edición
                    >
                      Editar Cliente
                    </button>
                  </div>
                )
              ) : (
                <p className="text-gray-500">Selecciona un cliente para ver sus detalles.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListaClientesPage;
