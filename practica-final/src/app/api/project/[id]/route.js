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

// Obtener un proyecto específico por ID
export async function GET(req, { params }) {
  try {
    const { id } = params; // Obtener el ID del proyecto
    const jwtToken = getJWT();

    const response = await fetch(`${API_BASE_URL}/project/one/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Error al obtener el proyecto" },
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
