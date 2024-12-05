"use client";

import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Encabezado from "../Components/Encabezado";
import FormularioAlbaran from "../Components/ComponentesAlabaran/FormularioAlbaran";
import { useRouter } from "next/navigation"; 

const AlbaranesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState("");
  const [hasAlbaranes, setHasAlbaranes] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const fetchAlbaranes = async () => {
      try {
        const res = await fetch("/api/deliverynote", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setHasAlbaranes(data.length > 0); 
        } else {
          throw new Error("Error al obtener los albaranes.");
        }
      } catch (err) {
        console.error("Error al verificar albaranes:", err);
        setError("Error al verificar albaranes.");
      }
    };

    fetchAlbaranes();
  }, []);

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

  const handleNavigateToAlbaranes = () => {
    if (hasAlbaranes) {
      router.push("albaranes/lista-albaranes"); 
    } else {
      alert("No hay albaranes creados todavía.");
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
          <div className="mt-4">
            <button
              onClick={handleNavigateToAlbaranes}
              className={`px-4 py-2 rounded ${
                hasAlbaranes ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!hasAlbaranes} 
            >
              Ir a Lista de Albaranes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbaranesPage;
