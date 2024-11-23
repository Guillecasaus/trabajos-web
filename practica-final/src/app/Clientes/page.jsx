"use client";

import ListaClientes from "../Components/ListaClientes";
import Link from "next/link";

export default function ClientesPage() {
  return (
<div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
      <ListaClientes />
      <Link
        href="/Clientes/CrearClientes"
        className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Crear Cliente
      </Link>
    </div>
  );
}
