"use client";

import { useState } from "react";
import FormularioCliente from "../Components/FormularioCliente";
import Navbar from "../Components/Navbar";
import Encabezado from "../Components/Encabezado";
import styles from "../Styles/crearCliente.module.css"; // Importar los estilos

export default function CrearCliente() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Función para manejar el cambio de vista
  const manejarCambioVista = () => {
    setMostrarFormulario(true);
  };

  return (
    <>
      <Encabezado tituloPagina="Crear Cliente" />
      <div className="flex">
        <Navbar />
        <div className={styles.contenedorPrincipal}>
          {/* Columna izquierda */}
          <div className={styles.columnaIzquierda}>
            {!mostrarFormulario ? (
              // Vista inicial con imagen y botón
              <div className="text-center flex flex-col items-center justify-center h-full">
                <img
                  src="/crear-cliente-placeholder.png"
                  alt="Crear Cliente"
                  className={styles.imagenPlaceholder}
                />
                <h2 className={styles.tituloFormulario}>Crea tu primer Cliente</h2>
                <p className="text-gray-600 mb-6">
                  Para poder generar Albaranes digitales
                </p>
                <button
                  className={styles.botonCrearCliente}
                  onClick={manejarCambioVista}
                >
                  ¡Sí, vamos!
                </button>
              </div>
            ) : (
              // Renderizar el formulario del cliente
              <FormularioCliente />
            )}
          </div>

          {/* Columna derecha */}
          <div className={styles.columnaDerecha}>
            <div className="mb-6">
              <h3 className="text-lg font-bold">Logo Cliente</h3>
              <div className="w-24 h-24 border border-gray-300 rounded-md flex items-center justify-center">
                <span className="text-gray-400">Sin logo</span>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-bold">Notes</h3>
              <textarea
                className="w-full p-2 border rounded-md"
                rows="4"
                placeholder="Añade notas sobre tu cliente"
              ></textarea>
            </div>
            <div>
              <h3 className="text-lg font-bold">Tags</h3>
              <p className="text-sm text-gray-600">
                Los tags se usan para clasificar a los clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
