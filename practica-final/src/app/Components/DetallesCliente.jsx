"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DetallesCliente = ({ clienteId }) => {
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await fetch(`/api/client/${clienteId}`);
        if (res.ok) {
          const data = await res.json();
          console.log("Cliente recibido:", data); // Depuración
          setCliente(data); // Almacenar el cliente recibido
        } else {
          const errorData = await res.json();
          setError(errorData.error || "Error al obtener el cliente");
        }
      } catch (error) {
        setError("Error al procesar la solicitud");
      }
    };

    if (clienteId) {
      fetchCliente();
    }
  }, [clienteId]);

  const eliminarCliente = async () => {
    if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        // Obtener el token JWT desde las cookies
        const res = await fetch(`/api/client/${clienteId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.replace(
              /(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            )}`, // Obtén el token JWT desde las cookies
          },
        });
  
        if (res.ok) {
          setMensaje("Cliente eliminado con éxito");
          setTimeout(() => {
            router.push("/lista-clientes"); // Redirige a la lista de clientes
          }, 2000);
        } else {
          const errorData = await res.json();
          setError(errorData.error || "Error al eliminar el cliente");
        }
      } catch (error) {
        setError("Error al procesar la solicitud");
      }
    }
  };
  
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!cliente) {
    return <p>Cargando cliente...</p>;
  }

  const { name, cif, address } = cliente;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{name || "Sin nombre"}</h2>
      <p>CIF: {cif || "No especificado"}</p>
      <h3 className="text-lg font-semibold mt-4">Dirección</h3>
      {address ? (
        <ul className="list-disc list-inside">
          <li>Calle: {address.street || "No especificado"}</li>
          <li>Número: {address.number || "No especificado"}</li>
          <li>Código Postal: {address.postal || "No especificado"}</li>
          <li>Ciudad: {address.city || "No especificado"}</li>
          <li>Provincia: {address.province || "No especificado"}</li>
        </ul>
      ) : (
        <p>No hay información de dirección disponible</p>
      )}

      {/* Botón para eliminar cliente */}
      <div className="mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={eliminarCliente}
        >
          Eliminar Cliente
        </button>
      </div>

      {mensaje && <p className="text-green-500 mt-2">{mensaje}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default DetallesCliente;
