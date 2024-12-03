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

    // Validar si el clientID es un ObjectId válido (si usas MongoDB)
    if (!clientId || !isValidObjectId(clientId)) {
      return NextResponse.json(
        { error: "El clientID proporcionado no es válido." },
        { status: 422 }
      );
    }

    // Validar los campos obligatorios del proyecto
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

    // Obtenemos el token JWT
    const jwtToken = getJWT();

    // Construimos el cuerpo del proyecto a enviar al backend
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

// Función para validar si un ObjectId es válido (ejemplo para MongoDB)
function isValidObjectId(id) {
  return /^[a-fA-F0-9]{24}$/.test(id);
}
