import { NextResponse } from "next/server";

const BACKEND_API_URL = "https://bildy-rpmaya.koyeb.app/api/project";

export async function POST(request) {
  try {
    const body = await request.json();
    const token = request.cookies.get("jwt");

    if (!token) {
      return NextResponse.json(
        { error: "No se encontró el token de autenticación" },
        { status: 401 }
      );
    }

    if (!body.ClientId) {
      return NextResponse.json(
        { error: "Debe seleccionar un cliente para el proyecto" },
        { status: 400 }
      );
    }

    const response = await fetch(BACKEND_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Error al crear el proyecto" },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
