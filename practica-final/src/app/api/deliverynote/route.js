import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = "https://bildy-rpmaya.koyeb.app/api";

function getJWT() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt");

  console.log("JWT token encontrado:", jwtToken?.value || "No encontrado");

  if (!jwtToken?.value) {
    throw new Error("No estás autenticado. Por favor, inicia sesión.");
  }

  return jwtToken.value;
}

export async function POST(req) {
  try {
    console.log("Iniciando procesamiento de solicitud POST");

    // Extraemos los datos enviados desde el frontend
    const {
      clientId,
      projectId,
      format,
      material,
      hours,
      description,
      workdate,
    } = await req.json();

    console.log("Datos recibidos desde el cliente:", {
      clientId,
      projectId,
      format,
      material,
      hours,
      description,
      workdate,
    });

    // Validamos los campos obligatorios
    if (
      !clientId ||
      !projectId ||
      !format ||
      !description ||
      !workdate ||
      (format === "material" && !material) || // Validar material si el formato es material
      (format === "hours" && !hours) // Validar horas si el formato es horas
    ) {
      console.log("Validación fallida. Faltan campos obligatorios.");
      return NextResponse.json(
        { error: "Todos los campos obligatorios deben ser proporcionados." },
        { status: 400 }
      );
    }

    // Obtenemos el token JWT
    const jwtToken = await getJWT();
    console.log("JWT token obtenido exitosamente.");

    // Construimos el cuerpo de la solicitud para enviar al backend
    const body = {
      clientId,
      projectId,
      format,
      material: format === "material" ? material : undefined, // Incluimos material solo si el formato es material
      hours: format === "hours" ? hours : undefined, // Incluimos horas solo si el formato es horas
      description,
      workdate,
    };

    console.log("Cuerpo de la solicitud a enviar al backend:", body);

    // Llamamos al backend
    const response = await fetch(`${API_BASE_URL}/deliverynote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
    });

    console.log("Respuesta del backend, status:", response.status);

    // Procesamos la respuesta del backend
    if (response.ok) {
      const data = await response.json();
      console.log("Datos recibidos del backend:", data);
      return NextResponse.json(data);
    } else {
      console.log("Error del backend, procesando mensaje de error...");
      const errorText = await response.text(); // Capturamos el texto completo de la respuesta
      console.log("Respuesta completa del backend (raw):", errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (parseError) {
        console.log("Error al parsear JSON del backend:", parseError.message);
        errorData = { message: "Error desconocido del backend." };
      }

      return NextResponse.json(
        { error: errorData.message || "Error al crear el recurso" },
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

export async function GET() {
  try {
    // Obtenemos el token JWT
    const jwtToken = getJWT();

    // Llamamos al backend
    const response = await fetch(`${API_BASE_URL}/deliverynote`, {
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
        { error: errorData.message || "Error al obtener los albaranes" },
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