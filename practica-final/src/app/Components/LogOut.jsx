"use client";

import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();

  const handleLogOut = () => {
    try {
      // Borra la cookie del JWT (asegúrate de que la cookie tenga el mismo dominio y path configurado)
      "jwt=; path=/; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      // Redirige explícitamente a la página de inicio de sesión
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <button
      onClick={handleLogOut}
      className="w-full bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogOut;
