import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      // Establecer la cookie JWT
      cookies().set("jwt", data.token, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
      });

      return NextResponse.json({ message: "Inicio de sesión exitoso" });
    } else {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        console.error("Error en la API externa:", errorData);
        return NextResponse.json({ error: errorData.message || "Credenciales inválidas" }, { status: response.status });
      } else {
        const errorText = await response.text();
        console.error("Error en la API externa (texto):", errorText);
        return NextResponse.json({ error: errorText || "Credenciales inválidas" }, { status: response.status });
      }
    }
  } catch (error) {
    console.error("Error interno del servidor:", error.message);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
