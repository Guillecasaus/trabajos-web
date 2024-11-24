import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">
        <span className="text-blue-500">Bildy</span> 
      </h1>
      <p className="text-2xl mt-3">Bienvenido a la plataforma de gestión de clientes</p>
      <div className="mt-4 flex space-x-4">
        {/* Botón para registrarse */}
        <Link href="/registro" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
          Registrarse
        </Link>
        {/* Botón para iniciar sesión */}
        <Link href="/login" className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}
