"use client";

import Navbar from "../Components/Navbar";
import Encabezado from "../Components/Encabezado";
import FormularioProyectos from "../Components/FormularioProyectos";

const ProjectsPage = () => {
  return (
    <div>
      <Navbar />
      <Encabezado />
      <div className="container mx-auto p-4">
        <FormularioProyectos />
      </div>
    </div>
  );
};

export default ProjectsPage;