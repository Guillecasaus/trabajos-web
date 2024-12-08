"use client";

import { useEffect, useState } from "react";

const ListaClientes = ({ onSelectCliente }) => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");

  // Función para eliminar un cliente de la lista
  const eliminarClienteDeLista = async (clienteId) => {
    if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        const res = await fetch(`/api/client/${clienteId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          // Filtrar el cliente eliminado de la lista local
          setClientes((prevClientes) =>
            prevClientes.filter((cliente) => cliente._id !== clienteId)
          );
          alert("Cliente eliminado con éxito");
        } else {
          const errorData = await res.json();
          alert(errorData.error || "Error al eliminar el cliente");
        }
      } catch (error) {
        console.error("Error al eliminar cliente:", error.message);
        alert("Hubo un error al procesar tu solicitud");
      }
    }
  };

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("/api/client");
        if (res.ok) {
          const data = await res.json();
          console.log("Clientes recibidos:", data);
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
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {clientes.length === 0 ? (
        <p className="text-gray-500">No hay clientes disponibles.</p>
      ) : (
        <ul>
          {clientes.map((cliente) => (
            <li
              key={cliente._id} 
              className="p-2 border-b hover:bg-gray-100 flex justify-between items-center"
            >
              <span
                className="cursor-pointer"
                onClick={() => onSelectCliente(cliente._id)} 
              >
                {cliente.name} 
              </span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => eliminarClienteDeLista(cliente._id)} 
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaClientes;
