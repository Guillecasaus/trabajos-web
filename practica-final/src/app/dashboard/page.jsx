"use client";

import Navbar from "../Components/Navbar";
import Encabezado from "../Components/Encabezado";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("/api/client", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setClientes(data);
        } else {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al obtener clientes");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return (
    <>
      <Encabezado tituloPagina="Dashboard - Gestión de Clientes" />
      <div className="flex h-screen bg-gray-100">
        <div className="w-64">
          <Navbar />
        </div>
        <div className="flex-grow p-6">
          <h2 className="text-3xl font-bold text-gray-800  text-center mb-8">
            Panel de Gestión
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link href="/clientes">
              <div className="p-6 bg-blue-100 text-blue-800 rounded-lg shadow-md hover:bg-blue-200 cursor-pointer">
                <h3 className="text-lg font-semibold">Clientes</h3>
                <p className="mt-2 text-sm">Gestiona tus clientes y sus detalles</p>
              </div>
            </Link>

            <Link href="/proyectos">
              <div className="p-6 bg-blue-100 text-blue-800 rounded-lg shadow-md hover:bg-blue-200 cursor-pointer">
                <h3 className="text-lg font-semibold">Proyectos</h3>
                <p className="mt-2 text-sm">Gestiona los proyectos asociados</p>
              </div>
            </Link>

            <Link href="/albaranes">
              <div className="p-6 bg-blue-100 text-blue-800 rounded-lg shadow-md hover:bg-blue-200 cursor-pointer">
                <h3 className="text-lg font-semibold">Albaranes</h3>
                <p className="mt-2 text-sm">Consulta y descarga albaranes</p>
              </div>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Resumen de Clientes
            </h3>
            {loading ? (
              <p className="text-gray-500">Cargando información...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ul className="list-disc list-inside">
                {clientes.map((cliente) => (
                  <li key={cliente._id} className="mb-2">
                    <strong className="text-gray-800">{cliente.name}</strong> -{" "}
                    <span className="text-gray-600">
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
