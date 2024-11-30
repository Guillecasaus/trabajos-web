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
          console.log("Clientes recibidos:", data);
          setClientes(data); // Asegúrate de establecer correctamente el estado
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
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {clientes.length === 0 ? (
        <p className="text-gray-500">No hay clientes disponibles.</p>
      ) : (
        <ul>
          {clientes.map((cliente) => (
            <li
              key={cliente._id} // Usar `_id` como clave única
              className="cursor-pointer p-2 border-b hover:bg-gray-100"
              onClick={() => onSelectCliente(cliente._id)} // Usar `_id` para seleccionar el cliente
            >
              {cliente.name} {/* Usar `name` para mostrar el nombre del cliente */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaClientes;
