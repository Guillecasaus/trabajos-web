import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = "https://bildy-rpmaya.koyeb.app/api";

export async function GET(req, context) {
  try {
    const id = context.params?.id;

    if (!id) {
      return NextResponse.json(
        { error: "ID del albarán no proporcionado" },
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const jwtToken = cookieStore.get("jwt")?.value;

    if (!jwtToken) {
      return NextResponse.json(
        { error: "Token de autenticación no proporcionado" },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/deliverynote/pdf/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${jwtToken}`, 
      },
    });

    if (response.ok) {
      const pdfBlob = await response.blob();
      const buffer = await pdfBlob.arrayBuffer();

      return new Response(buffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="deliverynote_${id}.pdf"`,
        },
      });
    } else {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || "Error al obtener el PDF del albarán" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error al obtener el PDF:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
