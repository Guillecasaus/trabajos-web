"use client";

import { useEffect, useState } from "react";

const ListaProyectos = ({ onSelectProyecto }) => {
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const res = await fetch("/api/project");
        if (res.ok) {
          const data = await res.json();
          setProyectos(data);
        } else {
          const errorData = await res.json();
          setError(errorData.error || "Error al obtener los proyectos.");
        }
      } catch (error) {
        setError("Error al procesar la solicitud.");
      }
    };

    fetchProyectos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Todos los Proyectos</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {proyectos.length === 0 ? (
        <p className="text-gray-500">No hay proyectos disponibles.</p>
      ) : (
        <ul>
          {proyectos.map((proyecto) => (
            <li
              key={proyecto._id}
              className="p-2 border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectProyecto(proyecto._id)}
            >
              {proyecto.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaProyectos;
