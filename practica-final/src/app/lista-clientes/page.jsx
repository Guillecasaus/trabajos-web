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
      <div className="flex">
        <Navbar />
        <div className="flex-grow flex">
          <div className="w-1/3 border-r">
            <ListaClientes onSelectCliente={setClienteSeleccionadoId} />
          </div>
          <div className="w-2/3 p-4">
            {clienteSeleccionadoId ? (
              <DetallesCliente clienteId={clienteSeleccionadoId} />
            ) : (
              <p className="text-gray-500">Selecciona un cliente para ver sus detalles.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListaClientesPage;
