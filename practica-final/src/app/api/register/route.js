import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
  
    if (response.ok) {
      const data = await response.json();

      cookies().set("jwt", data.token, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
      });

      return NextResponse.json({ message: "Registro exitoso" });
    } else {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        console.error("Error en la API externa:", errorData);
        return NextResponse.json({ error: errorData.message || "Error al registrar el usuario" }, { status: response.status });
      } else {
        const errorText = await response.text();
        console.error("Error en la API externa (texto):", errorText);
        return NextResponse.json({ error: errorText || "Error al registrar el usuario" }, { status: response.status });
      }
    }
  } catch (error) {
    console.error("Error interno del servidor:", error.message);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
