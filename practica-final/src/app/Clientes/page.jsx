"use client";

import { useEffect, useState } from "react";
import FormularioCliente from "../Components/FormularioCliente";
import Navbar from "../Components/Navbar";
import Encabezado from "../Components/Encabezado";
import { useRouter } from "next/navigation";

export default function CrearCliente() {
  const [hayClientes, setHayClientes] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Verificar si hay clientes registrados
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("/api/client");
        if (res.ok) {
          const data = await res.json();
          setHayClientes(data.length > 0); // Si hay clientes, habilitar el botón
        } else {
          const errorData = await res.json();
          setError(errorData.error || "Error al verificar los clientes.");
        }
      } catch (error) {
        setError("Error al procesar la solicitud.");
      }
    };

    fetchClientes();
  }, []);

  const redirigirListaClientes = () => {
    if (hayClientes) {
      router.push("/lista-clientes");
    } else {
      alert("No hay clientes registrados.");
    }
  };

  return (
    <>
      <Encabezado tituloPagina="Crear Cliente" />
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
          <div className="mb-6">
            <h3 className="text-lg font-bold">Tags</h3>
            <p className="text-sm text-gray-600">
              Los tags se usan para clasificar a los clientes.
            </p>
          </div>
          {/* Botón para redirigir a Lista de Clientes */}
          <div className="mt-6">
            <button
              onClick={redirigirListaClientes}
              className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
                !hayClientes ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!hayClientes}
            >
              Ver Lista de Clientes
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
