"use client";

import { useEffect, useState } from "react";

const ListaAlbaranes = ({ selectedIds, setSelectedIds }) => {
  const [albaranes, setAlbaranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbaranes = async () => {
      try {
        const res = await fetch("/api/deliverynote", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setAlbaranes(data);
        } else {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al obtener los albaranes");
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbaranes();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-700">Cargando albaranes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === albaranes.length) {
      setSelectedIds([]); // Deselecciona todo si todo estaba seleccionado
    } else {
      setSelectedIds(albaranes.map((albaran) => albaran._id)); // Selecciona todos los IDs
    }
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-md border border-gray-200 mx-auto w-4/5">
      <table className="min-w-full table-auto bg-white">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedIds.length === albaranes.length}
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-4 py-3 text-left">Código del Proyecto</th>
            <th className="px-4 py-3 text-left">Fecha</th>
            <th className="px-4 py-3 text-left">Nombre del Proyecto</th>
            <th className="px-4 py-3 text-left">Nombre del Cliente</th>
            <th className="px-4 py-3 text-left">Código Interno</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {albaranes.map((albaran) => (
            <tr
              key={albaran._id}
              className="hover:bg-gray-100 border-t border-gray-200"
            >
              {/* Checkbox para seleccionar este albarán */}
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(albaran._id)}
                  onChange={() => handleCheckboxChange(albaran._id)}
                />
              </td>

              {/* Código del Proyecto */}
              <td className="px-4 py-3 font-medium text-gray-900">
                {albaran.projectId?.code || "-"}
              </td>

              {/* Fecha */}
              <td className="px-4 py-3">
                {new Date(albaran.createdAt).toLocaleDateString()}
              </td>

              {/* Nombre del Proyecto */}
              <td className="px-4 py-3">
                {typeof albaran.projectId === "object"
                  ? albaran.projectId.name
                  : "-"}
              </td>

              {/* Nombre del Cliente */}
              <td className="px-4 py-3">
                {typeof albaran.clientId === "object"
                  ? albaran.clientId.name
                  : "-"}
              </td>

              {/* Código Interno */}
              <td className="px-4 py-3">
                #{albaran._id.slice(-6)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaAlbaranes;
