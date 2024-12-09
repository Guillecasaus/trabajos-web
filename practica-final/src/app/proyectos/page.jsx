"use client";

import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Encabezado from "../Components/Encabezado";
import FormularioProyectos from "../Components/ComponentesProyecto/FormularioProyectos";
import { useRouter } from "next/navigation";

const ProjectsPage = () => {
  const [hayProyectos, setHayProyectos] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Verificar si hay proyectos registrados
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const res = await fetch("/api/project");
        if (res.ok) {
          const data = await res.json();
          setHayProyectos(data.length > 0);
        } else {
          const errorData = await res.json();
          setError(errorData.error || "Error al verificar los proyectos.");
        }
      } catch (error) {
        setError("Error al procesar la solicitud.");
      }
    };

    fetchProyectos();
  }, []);

  const redirigirListaProyectos = () => {
    if (hayProyectos) {
      router.push("proyectos/lista-proyectos");
    } else {
      alert("No hay proyectos registrados.");
    }
  };

  return (
    <div>
      <Navbar />
      <Encabezado tituloPagina="Proyectos" />
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 p-4">
            <FormularioProyectos />
          </div>

          <div className="w-full lg:w-1/3 p-4 bg-gray-100 rounded-md shadow-md">
            <div className="mb-6">
              <h3 className="text-lg font-bold">Opciones</h3>
              <p className="text-sm text-gray-600">
                Verifica si hay proyectos registrados antes de proceder.
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={redirigirListaProyectos}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
                  !hayProyectos ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!hayProyectos}
              >
                Ver Lista de Proyectos
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
