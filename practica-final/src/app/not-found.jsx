import Encabezado from "./Components/Encabezado";
import Navbar from "./Components/Navbar";

export default function Custom404() {
  return (
    <>
      <Encabezado />
      <div className="flex h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />    
        {/* Contenido principal */}
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Página no encontrada
            </h2>
            <p className="text-gray-600 mb-6">
              Lo sentimos, la página que buscas no existe
            </p>
            <a
              href="/"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
