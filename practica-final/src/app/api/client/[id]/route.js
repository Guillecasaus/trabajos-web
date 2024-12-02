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

// Obtener un cliente específico por ID
export async function GET(req, { params }) {
  try {
    const { id } = params; // Obtener el ID de los parámetros
    const jwtToken = getJWT();

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
    console.error("Error interno del servidor:", error.message);
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Actualizar un cliente específico
export async function PUT(req, { params }) {
  try {
    const { id } = params; // Obtener el ID de los parámetros
    const jwtToken = getJWT();

    const updatedData = await req.json();

    const response = await fetch(`${API_BASE_URL}/client/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Error al actualizar el cliente" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error interno al actualizar el cliente:", error.message);
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Eliminar un cliente específico
export async function DELETE(req, { params }) {
  try {
    const { id } = params; // Obtener el ID de los parámetros
    const jwtToken = getJWT();

    const response = await fetch(`${API_BASE_URL}/client/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.ok) {
      return NextResponse.json(
        { message: "Cliente eliminado con éxito." },
        { status: 200 }
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Error al eliminar el cliente" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error interno al eliminar el cliente:", error.message);
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}
