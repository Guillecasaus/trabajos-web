"use client";

import Navbar from "../Components/Navbar";
import Encabezado from "../Components/Encabezado";
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
      <div className="flex h-screen bg-gray-50">
        <Navbar />
        <div className="flex-grow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Bienvenido a tu Panel de Gestión
          </h2>
          {loading ? (
            <p className="text-gray-500">Cargando información...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <p className="text-gray-700 mb-6">
                Aquí tienes un resumen rápido de tus clientes:
              </p>
              <ul className="list-disc list-inside bg-white p-4 rounded-md shadow-md">
                {clientes.map((cliente) => (
                  <li key={cliente._id} className="mb-2">
                    <strong className="text-gray-800">{cliente.name}</strong> -{" "}
                    <span className="text-gray-600">
                      {cliente.email || "Sin email registrado"}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}
