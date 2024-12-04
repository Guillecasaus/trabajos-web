"use client";

import { useEffect, useState } from "react";

const DetallesProyecto = ({ proyectoId }) => {
  const [proyecto, setProyecto] = useState(null);
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
          setError(errorData.error || "Error al obtener los detalles del proyecto.");
        }
      } catch (error) {
        setError("Error al procesar la solicitud.");
      }
    };

    fetchProyecto();
  }, [proyectoId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!proyecto) {
    return <p className="text-gray-500">Cargando detalles del proyecto...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{proyecto.name}</h2>
      <div className="mb-4">
        <strong>Código del Proyecto:</strong> {proyecto.projectCode}
      </div>
      <div className="mb-4">
        <strong>Código Interno:</strong> {proyecto.code}
      </div>
      <div className="mb-4">
        <strong>Cliente ID:</strong> {proyecto.clientId}
      </div>
      <div className="mb-4">
        <strong>Dirección:</strong>
        <ul className="pl-4 list-disc">
          <li>Calle: {proyecto.address.street}</li>
          <li>Número: {proyecto.address.number}</li>
          <li>Ciudad: {proyecto.address.city}</li>
          <li>Provincia: {proyecto.address.province}</li>
          <li>Código Postal: {proyecto.address.postal}</li>
        </ul>
      </div>
      <div className="mb-4">
        <strong>Notas:</strong> {proyecto.notes || "Sin notas"}
      </div>
      <div className="mb-4">
        <strong>Fecha de Inicio:</strong> {proyecto.begin}
      </div>
      <div className="mb-4">
        <strong>Fecha de Finalización:</strong> {proyecto.end}
      </div>
      <div className="mb-4">
        <strong>Precios de Servicios:</strong>
        {proyecto.servicePrices.length > 0 ? (
          <ul className="pl-4 list-disc">
            {proyecto.servicePrices.map((price, index) => (
              <li key={index}>{price}</li>
            ))}
          </ul>
        ) : (
          "Sin precios de servicios"
        )}
      </div>
      <div>
        <strong>Creado:</strong> {new Date(proyecto.createdAt).toLocaleString()}
      </div>
      <div>
        <strong>Última Actualización:</strong> {new Date(proyecto.updatedAt).toLocaleString()}
      </div>
    </div>
  );
};

export default DetallesProyecto;
