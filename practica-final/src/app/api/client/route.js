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
    const jwtToken = getJWT(); 

    const response = await fetch(`${API_BASE_URL}/client`, {
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

export async function POST(req) {
  try {
    const { nombre, domicilioFiscal, cif } = await req.json();

    if (!nombre || !domicilioFiscal) {
      return NextResponse.json(
        { error: "Los campos 'nombre' y 'domicilioFiscal' son obligatorios." },
        { status: 400 }
      );
    }

    const jwtToken = getJWT(); 

    const response = await fetch(`${API_BASE_URL}/client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        name: nombre,
        domicilioFiscal,
        cif,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(responseData);
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Error al crear el cliente" },
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
