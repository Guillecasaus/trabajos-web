import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = "https://bildy-rpmaya.koyeb.app/api";

async function getJWT() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")?.value;

  if (!jwtToken) {
    throw new Error("No estás autenticado. Por favor, inicia sesión.");
  }

  return jwtToken;
}

export async function GET(req) {
  try {
    const jwtToken = await getJWT();

    const response = await fetch(`${API_BASE_URL}/project`, {
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
        { error: errorData.message || "Error al obtener los proyectos" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error interno del servidor:", error.message);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
