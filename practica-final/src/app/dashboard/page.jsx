"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <div className="dashboard">
        <Navbar />
      </div>
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
      </div>
    </>
  );
}
