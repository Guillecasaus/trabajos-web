"use client";

import { useState } from "react";
import ListaClientes from "../Components/ListaClientes";
import DetallesCliente from "../Components/DetallesCliente";
import Navbar from "../Components/Navbar";
import Encabezado from "../Components/Encabezado";

const ListaClientesPage = () => {
  const [clienteSeleccionadoId, setClienteSeleccionadoId] = useState(null);

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

            {/* Detalles del cliente */}
            <div className="w-2/3 p-4 overflow-y-auto">
              {clienteSeleccionadoId ? (
                <DetallesCliente clienteId={clienteSeleccionadoId} />
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
