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
export async function GET() {
  try {
    const jwtToken = await getJWT();

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
    const { nombre, cif, address } = await req.json();

    if (!nombre || !address || !address.street || !address.number || !address.postal || !address.city || !address.province) {
      return NextResponse.json(
        { error: "Los campos 'nombre' y la dirección completa (calle, número, código postal, ciudad, provincia) son obligatorios." },
        { status: 400 }
      );
    }

    const jwtToken = await getJWT();

    const body = {
      name: nombre,
      cif,
      address: {
        street: address.street,
        number: address.number,
        postal: address.postal,
        city: address.city,
        province: address.province,
      },
    };

    console.log("Datos enviados al backend:", body); 

    const response = await fetch(`${API_BASE_URL}/client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
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


export async function DELETE(req, { params }) {
  const { id } = params; 

  if (!id) {
    return NextResponse.json(
      { error: "ID del cliente no proporcionado" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://api-url/client/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.JWT_TOKEN}`, 
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Error al eliminar el cliente" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Cliente eliminado con éxito." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

