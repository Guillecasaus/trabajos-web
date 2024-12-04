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
          console.log("Proyectos recibidos:", data);
          setProyectos(data); // Establecer el estado con los proyectos recibidos
        } else {
          const errorData = await res.json();
          setError(errorData.error || "Error al obtener los proyectos");
        }
      } catch (error) {
        setError("Error al procesar la solicitud");
        console.error("Error al obtener los proyectos:", error.message);
      }
    };

    fetchProyectos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Proyectos</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {proyectos.length === 0 ? (
        <p className="text-gray-500">No hay proyectos disponibles.</p>
      ) : (
        <ul className="space-y-2">
          {proyectos.map((proyecto) => (
            <li
              key={proyecto._id} // Usar `_id` como clave única
              className="p-2 border rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectProyecto(proyecto._id)} // Seleccionar proyecto al hacer clic
            >
              <h3 className="font-semibold text-lg">{proyecto.name}</h3>
              <p className="text-sm text-gray-600">{proyecto.projectCode}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaProyectos;
