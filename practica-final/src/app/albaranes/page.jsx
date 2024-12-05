"use client";

import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Encabezado from "../Components/Encabezado";
import FormularioAlbaran from "../Components/FormularioAlbaran";

const AlbaranesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("/api/client");
        const data = await res.json();
        setClientes(data);
      } catch (err) {
        setError("Error al obtener clientes.");
      }
    };

    const fetchProyectos = async () => {
      try {
        const res = await fetch("/api/project");
        const data = await res.json();
        setProyectos(data);
      } catch (err) {
        setError("Error al obtener proyectos.");
      }
    };

    fetchClientes();
    fetchProyectos();
  }, []);

  const handleCrearAlbaran = async (formData) => {
    try {
      const res = await fetch("/api/deliverynote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Error al crear el albarán");
      }

      alert("Albarán creado con éxito");
    } catch (error) {
      alert("Hubo un error al crear el albarán.");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <Encabezado tituloPagina="Crear Albarán" />
      <div className="flex h-screen">
        <div className="w-64 flex-shrink-0">
          <Navbar />
        </div>
        <div className="flex-grow p-4">
          <FormularioAlbaran
            clientes={clientes}
            proyectos={proyectos}
            onSubmit={handleCrearAlbaran}
          />
        </div>
      </div>
    </>
  );
};

export default AlbaranesPage;
