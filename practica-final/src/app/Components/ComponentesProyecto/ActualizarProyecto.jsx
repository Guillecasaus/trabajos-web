"use client";

import { useState, useEffect } from "react";

const ActualizarProyecto = ({ proyectoId, onProyectoActualizado }) => {
  const [proyecto, setProyecto] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const res = await fetch(`/api/project/one/${proyectoId}`);
        if (res.ok) {
          const data = await res.json();
          setProyecto(data);
        } else {
          const errorData = await res.json();
          setError(errorData.error || "Error al obtener el proyecto");
        }
      } catch (err) {
        setError("Error al procesar la solicitud");
      }
    };

    if (proyectoId) {
      fetchProyecto();
    }
  }, [proyectoId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setProyecto((prevProyecto) => ({
        ...prevProyecto,
        address: {
          ...prevProyecto.address,
          [addressField]: value,
        },
      }));
    } else {
      setProyecto((prevProyecto) => ({
        ...prevProyecto,
        [name]: value,
      }));
    }
  };

  const handleActualizar = async () => {
    try {
      const res = await fetch(`/api/project/${proyectoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proyecto),
      });

      if (res.ok) {
        const data = await res.json();
        setMensaje("Proyecto actualizado con éxito");
        onProyectoActualizado(data);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Error al actualizar el proyecto");
      }
    } catch (err) {
      setError("Error al procesar la solicitud");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!proyecto) {
    return <p>Cargando proyecto...</p>;
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Editar Proyecto</h2>
      {mensaje && <p className="text-green-500">{mensaje}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="name">
            Nombre del Proyecto
          </label>
          <input
            id="name"
            name="name"
            value={proyecto.name || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="projectCode">
            Código del Proyecto
          </label>
          <input
            id="projectCode"
            name="projectCode"
            value={proyecto.projectCode || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="code">
            Código
          </label>
          <input
            id="code"
            name="code"
            value={proyecto.code || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={proyecto.email || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="clientId">
            ID del Cliente
          </label>
          <input
            id="clientId"
            name="clientId"
            value={proyecto.clientId || ""}
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
              value={proyecto.address?.street || ""}
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
              value={proyecto.address?.number || ""}
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
              value={proyecto.address?.postal || ""}
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
              value={proyecto.address?.city || ""}
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
              value={proyecto.address?.province || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="notes">
            Notas
          </label>
          <textarea
            id="notes"
            name="notes"
            value={proyecto.notes || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
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

export default ActualizarProyecto;
