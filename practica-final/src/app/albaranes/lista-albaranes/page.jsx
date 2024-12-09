"use client";

import { useState } from "react";
import ListaAlbaranes from "@/app/Components/ComponentesAlabaran/ListaAlbaranes";
import Navbar from "@/app/Components/Navbar";
import Encabezado from "@/app/Components/Encabezado";

export default function ListaAlbaranesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [selectedIds, setSelectedIds] = useState([]);

    const handleDownloadPDF = async (id) => {
        try {
            const response = await fetch(`/api/deliverynote/pdf/${id}`, {
                method: "GET",
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `deliverynote_${id}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                console.error(`Error al descargar el archivo PDF para el ID "${id}"`);
            }
        } catch (error) {
            console.error("Error al gestionar la descarga del PDF:", error);
        }
    };


    return (
        <>
            <Encabezado tituloPagina="Lista de Albaranes" />
            <div className="flex justify-center">
                <Navbar />
                <div className="w-4/6 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <input
                            type="text"
                            placeholder="Buscar por ID, producto, cliente..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border px-4 py-2 rounded-md w-1/3"
                        />
                        <div className="flex space-x-4">
                            <input
                                type="date"
                                value={dateRange.start}
                                onChange={(e) =>
                                    setDateRange((prev) => ({ ...prev, start: e.target.value }))
                                }
                                className="border px-4 py-2 rounded-md"
                            />
                            <input
                                type="date"
                                value={dateRange.end}
                                onChange={(e) =>
                                    setDateRange((prev) => ({ ...prev, end: e.target.value }))
                                }
                                className="border px-4 py-2 rounded-md"
                            />
                        </div>
                        <button
                            onClick={() => {
                                if (selectedIds.length > 0) {
                                    selectedIds.forEach((id) => {
                                        handleDownloadPDF(id);
                                    });
                                } else {
                                    console.error("Selecciona al menos un albarán para descargar.");
                                }
                            }}

                            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${selectedIds.length === 0 && "opacity-50 cursor-not-allowed"
                                }`}
                            disabled={selectedIds.length === 0}
                        >
                            Descargar Seleccionados
                        </button>

                    </div>
                    <ListaAlbaranes
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                    />
                </div>
            </div>
        </>
    );
}
