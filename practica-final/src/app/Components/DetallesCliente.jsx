"use client";

import { useEffect, useState } from "react";

const DetallesCliente = ({ clienteId }) => {
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState("");

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
    </div>
  );
};

export default DetallesCliente;