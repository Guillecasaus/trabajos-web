"use client";

import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Encabezado from "../Components/Encabezado";
import FormularioProyectos from "../Components/FormularioProyectos";
const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        } else {
          const errorData = await res.json();
          setError(errorData.error || "Error al obtener los proyectos");
        }
      } catch (err) {
        setError("Error al procesar la solicitud");
      }
    };

    fetchProjects();
  }, []);

  return (
    <><Encabezado tituloPagina="Proyectos" /><div className="flex h-screen bg-gray-100">
          <Navbar />
          <div className="flex-grow flex flex-col ml-64">
              <div className="flex flex-grow p-6 space-x-6">
                  <div className="w-2/3 space-y-6">
                      <FormularioProyectos />
                      <div className="bg-white shadow-md rounded-lg p-6">
                          <h2 className="text-2xl font-bold mb-4">Albaranes</h2>
                          {error && <p className="text-red-500">{error}</p>}
                          <table className="table-auto w-full text-left border-collapse">
                              <thead>
                                  <tr>
                                      <th className="border-b p-2">Num</th>
                                      <th className="border-b p-2">Nombre</th>
                                      <th className="border-b p-2">Cliente</th>
                                      <th className="border-b p-2">Estado</th>
                                      <th className="border-b p-2">Acción</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {projects.map((project) => (
                                      <tr key={project.id} className="hover:bg-gray-50">
                                          <td className="border-b p-2">{project.id}</td>
                                          <td className="border-b p-2">{project.name}</td>
                                          <td className="border-b p-2">{project.clientName}</td>
                                          <td className="border-b p-2">
                                              <span
                                                  className={`px-2 py-1 text-xs rounded ${project.status === "Finalizado"
                                                          ? "bg-green-100 text-green-700"
                                                          : project.status === "En marcha"
                                                              ? "bg-yellow-100 text-yellow-700"
                                                              : "bg-red-100 text-red-700"}`}
                                              >
                                                  {project.status}
                                              </span>
                                          </td>
                                          <td className="border-b p-2">
                                              <button
                                                  onClick={() => console.log("Detalles del proyecto")}
                                                  className="text-blue-500 hover:underline"
                                              >
                                                  Ver detalles
                                              </button>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default ProjectsPage;
