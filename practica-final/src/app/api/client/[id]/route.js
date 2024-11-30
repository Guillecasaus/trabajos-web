import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = "https://bildy-rpmaya.koyeb.app/api";

function getJWT() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")?.value;

  if (!jwtToken) {
    throw new Error("No estás autenticado. Por favor, inicia sesión.");
  }

  return jwtToken;
}


export async function GET() {
  try {
    const jwtToken = getJWT(); // Recuperar el token JWT

    const response = await fetch(`${API_BASE_URL}/client`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      // Asegúrate de devolver un array con los clientes
      if (Array.isArray(data)) {
        return NextResponse.json(data);
      } else {
        return NextResponse.json(
          { error: "La respuesta del backend no es un array de clientes." },
          { status: 500 }
        );
      }
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Error al obtener los clientes" },
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

