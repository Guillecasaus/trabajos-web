"use client";

import Navbar from "../Components/Navbar";
import Encabezado from "../Components/Encabezado";

export default function Home() {

  return (
    <>
      <Encabezado/>
      <div className="dashboard">
        <Navbar />
      </div>
      {/*
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">
          <span className="text-blue-500">Bildy</span> 
        </h1>
        <a
          href="/Clientes"
          className="bg-green-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-green-600"
        >
          Ir a Clientes
        </a>
      </div>*/}
    </>
  );
}
