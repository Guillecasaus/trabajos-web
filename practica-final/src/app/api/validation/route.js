import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt"); 

  if (!jwt) {
    return NextResponse.json({ error: "No estás autenticado" }, { status: 401 });
  }

  try {
    const { code } = await req.json();

    const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/validation", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt.value}`, 
      },
      body: JSON.stringify({ code }),
    });

    if (response.ok) {
      return NextResponse.json({ message: "Correo validado con éxito" });
    } else {
      return NextResponse.json({ error: "Error al validar el código" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
