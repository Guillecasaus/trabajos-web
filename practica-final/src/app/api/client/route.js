import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req) {
  try {
    const { nombre, domicilioFiscal, cif } = await req.json();

    console.log("Datos recibidos:", { nombre, domicilioFiscal, cif });

    // Validar los campos obligatorios
    if (!nombre || !domicilioFiscal) {
      console.error("Validación fallida: Faltan campos obligatorios");
      return NextResponse.json(
        { error: "Los campos 'nombre' y 'domicilioFiscal' son obligatorios." },
        { status: 400 }
      );
    }

    // Leer el token JWT de las cookies desde los headers
    const headersList = headers();
    const cookieHeader = headersList.get("cookie") || "";
    const jwtToken = cookieHeader
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    console.log("Token JWT extraído:", jwtToken);

    if (!jwtToken) {
      console.error("Error: Usuario no autenticado");
      return NextResponse.json(
        { error: "No estás autenticado. Por favor, inicia sesión." },
        { status: 401 }
      );
    }

    // Llamar a la API externa con los datos correctos
    console.log("Enviando datos a la API externa...");
    const response = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        name: nombre, // Cambiamos 'nombre' a 'name'
        domicilioFiscal,
        cif,
      }),
    });

    const responseData = await response.json();
    console.log("Respuesta de la API externa:", responseData);

    if (response.ok) {
      console.log("Cliente creado con éxito en la API externa");
      return NextResponse.json({ message: "Cliente creado con éxito" });
    } else {
      console.error("Error al crear cliente en la API externa:", responseData);
      return NextResponse.json(
        { error: responseData.message || "Error al crear el cliente" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error interno del servidor:", error.message);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
