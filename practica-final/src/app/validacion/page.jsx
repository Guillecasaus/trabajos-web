"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ValidarCodigo() {
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const manejarValidacion = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/validation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codigo }), 
      });

      if (res.ok) {
        setMensaje("¡Correo validado con éxito!");
        router.push("/dashboard");
      } else {
        const errorData = await res.json();
        setMensaje(errorData.error || "Error al validar el código.");
      }
    } catch (error) {
      setMensaje("Hubo un error al procesar tu solicitud.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Validar Código</h2>
      {mensaje && (
        <p
          className={`mb-4 text-center ${mensaje.includes("éxito") ? "text-green-500" : "text-red-500"
            }`}
        >
          {mensaje}
        </p>
      )}
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
