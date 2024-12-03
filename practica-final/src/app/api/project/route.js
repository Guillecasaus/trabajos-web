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
      projectName,
      projectCode,
      ClientId,
      email,
      address,
    } = await req.json();

    // Validamos los campos obligatorios
    if (
      !projectName ||
      !projectCode ||
      !ClientId ||
      !email ||
      !address?.street ||
      !address?.number ||
      !address?.postal ||
      !address?.city ||
      !address?.province
    ) {
      return NextResponse.json(
        {
          error:
            "Todos los campos del proyecto y la dirección completa (calle, número, código postal, ciudad, provincia) son obligatorios.",
        },
        { status: 400 }
      );
    }

    // Obtenemos el token JWT
    const jwtToken = getJWT();

    // Construimos el cuerpo del proyecto a enviar al backend
    const body = {
      projectName,
      projectCode,
      ClientId,
      email,
      address: {
        street: address.street,
        number: address.number,
        postal: address.postal,
        city: address.city,
        province: address.province,
      },
    };

    console.log("Datos enviados al backend:", body); // Depuración

    // Hacemos la solicitud al backend
    const response = await fetch(`${API_BASE_URL}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
    });

    // Manejo de la respuesta
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(responseData, { status: 201 });
    } else {
      const errorData = await response.json();
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
