"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">
        <span className="text-blue-500">Bildy</span> <span className="text-gray-800">RPMaya</span>
      </h1>
      <p className="text-2xl mt-3">¡Bienvenido a la plataforma de gestión de clientes!</p>
      <p className="text-gray-700 mt-2">Empieza gestionando tus clientes desde aquí.</p>
      <a
        href="/Clientes"
        className="bg-green-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-green-600"
      >
        Ir a Clientes
      </a>
    </div>
  );
}
