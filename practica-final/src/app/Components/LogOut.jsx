"use client";

import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const response = await fetch("/api/logout", { method: "GET" });

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Error al cerrar sesión:", await response.json());
      }
    } catch (error) {
      console.error("Error al gestionar la desconexión:", error);
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
