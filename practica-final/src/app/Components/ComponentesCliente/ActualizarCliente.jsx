"use client";

import { useState, useEffect } from "react";

const ActualizarCliente = ({ clienteId, onClienteActualizado }) => {
  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");
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
      } catch (err) {
        setError("Error al procesar la solicitud");
      }
    };

    if (clienteId) {
      fetchCliente();
    }
  }, [clienteId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1]; 
      setCliente((prevCliente) => ({
        ...prevCliente,
        address: {
          ...prevCliente.address,
          [addressField]: value,
        },
      }));
    } else {
      setCliente((prevCliente) => ({
        ...prevCliente,
        [name]: value,
      }));
    }
  };

  const handleActualizar = async () => {
    try {
      const res = await fetch(`/api/client/${clienteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      if (res.ok) {
        const data = await res.json();
        setMensaje("Cliente actualizado con éxito");
        onClienteActualizado(data); 
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Error al actualizar el cliente");
      }
    } catch (err) {
      setError("Error al procesar la solicitud");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!cliente) {
    return <p>Cargando cliente...</p>;
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
      {mensaje && <p className="text-green-500">{mensaje}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            value={cliente.name || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="cif">
            CIF
          </label>
          <input
            id="cif"
            name="cif"
            value={cliente.cif || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Dirección</h3>
          <div>
            <label className="block text-sm font-medium" htmlFor="street">
              Calle
            </label>
            <input
              id="street"
              name="address.street"
              value={cliente.address?.street || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="number">
              Número
            </label>
            <input
              id="number"
              name="address.number"
              value={cliente.address?.number || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="postal">
              Código Postal
            </label>
            <input
              id="postal"
              name="address.postal"
              value={cliente.address?.postal || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="city">
              Ciudad
            </label>
            <input
              id="city"
              name="address.city"
              value={cliente.address?.city || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="province">
              Provincia
            </label>
            <input
              id="province"
              name="address.province"
              value={cliente.address?.province || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          onClick={handleActualizar}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default ActualizarCliente;
