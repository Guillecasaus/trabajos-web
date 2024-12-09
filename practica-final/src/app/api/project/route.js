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
    const {
      name,
      projectCode,
      email,
      address,
      code,
      clientId,
    } = await req.json();

    console.log("Datos recibidos en la solicitud:", {
      name,
      projectCode,
      email,
      address,
      code,
      clientId,
    });

    if (!clientId || !isValidObjectId(clientId)) {
      return NextResponse.json(
        { error: "El clientID proporcionado no es válido." },
        { status: 422 }
      );
    }

    if (
      !name ||
      !projectCode ||
      !email ||
      !address ||
      !address.street ||
      !address.number ||
      !address.postal ||
      !address.city ||
      !address.province ||
      !code
    ) {
      return NextResponse.json(
        {
          error:
            "Todos los campos del proyecto y la dirección completa (calle, número, código postal, ciudad, provincia) son obligatorios.",
        },
        { status: 400 }
      );
    }

    const jwtToken = getJWT();

    const body = {
      name,
      projectCode,
      email,
      address: {
        street: address.street,
        number: address.number,
        postal: address.postal,
        city: address.city,
        province: address.province,
      },
      code,
      clientId, 
    };

    console.log("Datos enviados al backend:", body); 

    const response = await fetch(`${API_BASE_URL}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Respuesta del backend:", responseData);
      return NextResponse.json(responseData, { status: 201 });
    } else {
      const errorData = await response.json();
      console.error("Error devuelto por el backend:", errorData);
      return NextResponse.json(
        { error: errorData.message || "Error al crear el proyecto" },
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

function isValidObjectId(id) {
  return /^[a-fA-F0-9]{24}$/.test(id);
}

export async function GET() {
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
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}
