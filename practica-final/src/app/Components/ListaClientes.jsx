"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ObtenerClientes = async () => {
  const res = await fetch("https://bildy-rpmaya.koyeb.app/api/client");
  const data = await res.json();
  return data;
};

export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarClientes() {
      try {
        const data = await ObtenerClientes();
        setClientes(data);
      } catch (err) {
        setError("Error al cargar los clientes");
      }
    }
    cargarClientes();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {clientes.map((cliente) => (
          <li
            key={cliente.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <span>
              {cliente.name} ({cliente.email})
            </span>
            <Link
              href={`/clients/${cliente.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Editar
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/clients/new"
        className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Crear Cliente
      </Link>
    </div>
  );
}
