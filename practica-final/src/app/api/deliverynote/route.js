import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = "https://bildy-rpmaya.koyeb.app/api";

function getJWT() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt");

  if (!jwtToken?.value) {
    throw new Error("No estás autenticado. Por favor, inicia sesión.");
  }

  return jwtToken.value;
}

export async function POST(req) {
    try {
      // Extraemos los datos enviados desde el frontend
      const {
        clientId,
        projectId,
        format,
        material,
        hours,
        description,
        workdate,
      } = await req.json();
  
      // Validamos los campos obligatorios
      if (
        !clientId ||
        !projectId ||
        !format ||
        !description ||
        !workdate ||
        (format === "material" && !material) || // Validar material si el formato es material
        (format === "hours" && !hours) // Validar horas si el formato es horas
      ) {
        return NextResponse.json(
          { error: "Todos los campos obligatorios deben ser proporcionados." },
          { status: 400 }
        );
      }
  
      // Obtenemos el token JWT
      const jwtToken = await getJWT();
  
      // Construimos el cuerpo de la solicitud para enviar al backend
      const body = {
        clientId,
        projectId,
        format,
        material: format === "material" ? material : undefined, // Incluimos material solo si el formato es material
        hours: format === "hours" ? hours : undefined, // Incluimos horas solo si el formato es horas
        description,
        workdate,
      };
  
      // Llamamos al backend
      const response = await fetch(`${API_BASE_URL}/resource`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(body),
      });
  
      // Procesamos la respuesta del backend
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      } else {
        const errorData = await response.json();
        return NextResponse.json(
          { error: errorData.message || "Error al crear el recurso" },
          { status: response.status }
        );
      }
    } catch (error) {
      console.error("Error interno del servidor:", error.message);
      return NextResponse.json(
        { error: error.message || "Error interno del servidor" },
        { status: 500 }
      );
    }
  }
  