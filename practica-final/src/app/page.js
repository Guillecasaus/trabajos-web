import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">
        <span className="text-blue-500">Bildy</span> <span className="text-gray-800">RPMaya</span>
      </h1>
      <p className="text-2xl mt-3">Bienvenido a la plataforma de gestión de clientes</p>
      <Link href="/registro" className="bg-blue-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-blue-600">
        Ir a Registro
      </Link>
    </div>
  );
}
