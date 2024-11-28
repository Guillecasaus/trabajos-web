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
          setCliente(data);
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{cliente.nombre}</h2>
      <p>Domicilio Fiscal: {cliente.domicilioFiscal}</p>
      <p>CIF: {cliente.cif}</p>
    </div>
  );
};

export default DetallesCliente;
