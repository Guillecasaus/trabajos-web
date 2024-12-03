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
    // Extraer y loggear los datos recibidos en la solicitud
    const { name, projectCode, email, address, code, clientID } = await req.json();
    console.log("Datos recibidos en API:", { name, projectCode, email, address, code, clientID });

    // Validar los campos obligatorios
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
      !code ||
      !clientID
    ) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios y deben estar correctamente estructurados." },
        { status: 400 }
      );
    }

    // Obtener el JWT
    const jwtToken = getJWT();

    // Preparar datos para la llamada al backend
    const body = {
      name: name,
      projectCode: projectCode,
      email: email,
      address: {
        street: address.street,
        number: address.number,
        postal: address.postal,
        city: address.city,
        province: address.province,
      },
      code: code,
      clientID: clientID,
    };
    console.log("Datos enviados al backend:", body);

    // Hacer la llamada al backend
    const response = await fetch(`${API_BASE_URL}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
    });

    console.log("Respuesta del backend:", response);

    // Manejar la respuesta del backend
    if (response.ok) {
      const data = await response.json();
      console.log("Datos recibidos del backend:", data);
      return NextResponse.json(data);
    } else {
      const errorData = await response.json();
      console.error("Error desde el backend:", errorData);
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
