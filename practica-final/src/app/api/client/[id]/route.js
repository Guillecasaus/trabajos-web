import { NextResponse } from "next/server";
import { headers } from "next/headers";

const API_BASE_URL = "https://bildy-rpmaya.koyeb.app/api";

async function getJWT() {
  const headersList = headers();
  const cookieHeader = headersList.get("cookie") || "";
  return cookieHeader
    .split("; ")
    .find((row) => row.startsWith("jwt="))
    ?.split("=")[1];
}

export async function GET(req, { params }) {
  try {
    const jwtToken = await getJWT();
    if (!jwtToken) {
      return NextResponse.json(
        { error: "No estás autenticado. Por favor, inicia sesión." },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "El ID del cliente es obligatorio." },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/client/${id}`, {
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
        { error: errorData.message || "Error al obtener el cliente" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error en el servidor:", error.message);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
