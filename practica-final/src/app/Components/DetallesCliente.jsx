"use client";

import { useEffect, useState } from "react";

const DetallesCliente = ({ clienteId }) => {
  const [clienteData, setClienteData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await fetch(`/api/client/${clienteId}`);
        if (res.ok) {
          const data = await res.json();
          console.log("Cliente recibido:", data); // Depuración
          setClienteData(data); // Asignar datos recibidos directamente
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

  if (!clienteData) {
    return <p>Cargando cliente...</p>;
  }

  // Accediendo directamente a `data` (clienteData)
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">
        {clienteData.name || "Sin nombre"}
      </h2>
      <p>
        Domicilio Fiscal: {clienteData.address?.domicilioFiscal || "No especificado"}
      </p>
      <p>CIF: {clienteData.cif || "No especificado"}</p>
    </div>
  );
};

export default DetallesCliente;
