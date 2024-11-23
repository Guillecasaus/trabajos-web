"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ValidarCodigo() {
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const manejarValidacion = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt"); // Recuperar el token JWT del registro o inicio de sesión.

    if (!token) {
      setMensaje("No se encontró un token de sesión. Regístrate o inicia sesión primero.");
      return;
    }

    try {
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/validation", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Enviar el token en las cabeceras.
        },
        body: JSON.stringify({ code: codigo }), // Código de validación introducido por el usuario.
      });

      if (response.ok) {
        setMensaje("¡Correo validado con éxito!");
        router.push("/inicio"); // Redirigir al dashboard o home.
      } else {
        setMensaje("Error al validar el código. Verifica el código e inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Hubo un error al procesar tu solicitud.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Validar Código</h2>
      {mensaje && <p className={`mb-4 text-center ${mensaje.includes("éxito") ? "text-green-500" : "text-red-500"}`}>{mensaje}</p>}
      <form onSubmit={manejarValidacion} className="space-y-4">
        <div>
          <label htmlFor="codigo" className="block text-sm font-medium mb-1">
            Código de Validación
          </label>
          <input
            id="codigo"
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Validar Código
        </button>
      </form>
    </div>
  );
}
