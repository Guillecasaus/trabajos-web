"use client";

import FormularioCliente from "../Components/FormularioCliente";
import Navbar from "../Components/Navbar";
import Encabezado from "../Components/Encabezado";

export default function CrearCliente() {
  return (
    <>
      <Encabezado />
      <div className="dashboard">
        <Navbar />
      </div>
      <div className="flex flex-row">
        {/* Columna izquierda */}
        <div className="w-2/3 p-8">
          <FormularioCliente />
        </div>

        {/* Columna derecha */}
        <div className="w-1/3 p-8 bg-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold">Logo Cliente</h3>
            <div className="w-24 h-24 border border-gray-300 rounded-md flex items-center justify-center">
              <span className="text-gray-400">Sin logo</span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold">Notes</h3>
            <textarea
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Añade notas sobre tu cliente"
            ></textarea>
          </div>
          <div>
            <h3 className="text-lg font-bold">Tags</h3>
            <p className="text-sm text-gray-600">
              Los tags se usan para clasificar a los clientes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
