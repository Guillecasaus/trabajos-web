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
    </>
  );
}
