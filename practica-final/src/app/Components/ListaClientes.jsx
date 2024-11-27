"use client";

import { useEffect, useState } from "react";

const ListaClientes = ({ onSelectCliente }) => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("/api/client");
        if (res.ok) {
          const data = await res.json();
          setClientes(data);
        } else {
          const errorData = await res.json();
          setError(errorData.error || "Error al obtener los clientes");
        }
      } catch (error) {
        setError("Error al procesar la solicitud");
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Todos los clientes</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul>
        {clientes.map((cliente) => (
          <li
            key={cliente.id}
            className="cursor-pointer p-2 border-b hover:bg-gray-100"
            onClick={() => onSelectCliente(cliente.id)}
          >
            {cliente.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaClientes;
