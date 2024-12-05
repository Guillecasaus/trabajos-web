"use client";

import { useState, useEffect } from "react";

// Componente de confirmación
const ModalConfirmacion = ({ mensaje, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="text-center">
          <div className="text-4xl text-blue-500 mb-4">✔️</div>
          <h2 className="text-lg font-semibold mb-2">{mensaje}</h2>
          <p className="text-gray-500 mb-6">
            ¿Quieres crear otro albarán o finalizar?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => onConfirm(true)}
            >
              Crear otro
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => onConfirm(false)}
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const enviarAlbaranAPI = async (values, setMensaje, setShowModal) => {
  try {
    const res = await fetch("/api/deliverynote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const responseText = await res.text();
    console.log("Respuesta del servidor:", responseText);

    if (res.ok) {
      const data = JSON.parse(responseText);
      console.log("Datos enviados al servidor:", data);
      setMensaje("Albarán creado con éxito");
      setShowModal(true);
    } else {
      const errorData = JSON.parse(responseText);
      throw new Error(errorData.error || "Error al crear el albarán");
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    setMensaje(`Error al procesar la solicitud: ${error.message}`);
  }
};


const FormularioAlbaran = () => {
  const [clientes, setClientes] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [formData, setFormData] = useState({
    clientId: "",
    projectId: "",
    format: "",
    material: "",
    hours: "",
    description: "",
    workdate: "",
  });
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Cargar clientes y proyectos
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("/api/client");
        const data = await res.json();
        setClientes(data || []);
      } catch (err) {
        console.error("Error al obtener los clientes:", err);
      }
    };

    const fetchProyectos = async () => {
      try {
        const res = await fetch("/api/project");
        const data = await res.json();
        setProyectos(data || []);
      } catch (err) {
        console.error("Error al obtener los proyectos:", err);
      }
    };

    fetchClientes();
    fetchProyectos();
  }, []);

  // Validación personalizada
  const validate = () => {
    const newErrors = {};
    if (!formData.clientId) newErrors.clientId = "El cliente es obligatorio";
    if (!formData.projectId) newErrors.projectId = "El proyecto es obligatorio";
    if (!formData.format) newErrors.format = "El formato es obligatorio";
    if (formData.format === "material" && !formData.material)
      newErrors.material = "El material es obligatorio";
    if (formData.format === "hours" && (!formData.hours || formData.hours <= 0))
      newErrors.hours = "Las horas deben ser mayores a 0";
    if (!formData.description)
      newErrors.description = "La descripción es obligatoria";
    if (!formData.workdate)
      newErrors.workdate = "La fecha de trabajo es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await enviarAlbaranAPI(formData, setMensaje, setShowModal);
      setFormData({
        clientId: "",
        projectId: "",
        format: "",
        material: "",
        hours: "",
        description: "",
        workdate: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Crear Albarán</h2>
      {mensaje && (
        <p
          className={`mb-4 text-center ${mensaje.includes("éxito") ? "text-green-500" : "text-red-500"
            }`}
        >
          {mensaje}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="clientId" className="block text-sm font-medium mb-1">
            Cliente*
          </label>
          <select
            id="clientId"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Selecciona un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente._id} value={cliente._id}>
                {cliente.name}
              </option>
            ))}
          </select>
          {errors.clientId && (
            <p className="text-red-500 text-sm">{errors.clientId}</p>
          )}
        </div>

        <div>
          <label htmlFor="projectId" className="block text-sm font-medium mb-1">
            Proyecto*
          </label>
          <select
            id="projectId"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Selecciona un proyecto</option>
            {proyectos.map((proyecto) => (
              <option key={proyecto._id} value={proyecto._id}>
                {proyecto.name}
              </option>
            ))}
          </select>
          {errors.projectId && (
            <p className="text-red-500 text-sm">{errors.projectId}</p>
          )}
        </div>

        <div>
          <label htmlFor="format" className="block text-sm font-medium mb-1">
            Formato*
          </label>
          <select
            id="format"
            name="format"
            value={formData.format}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Selecciona un formato</option>
            <option value="material">Material</option>
            <option value="hours">Horas</option>
          </select>
          {errors.format && (
            <p className="text-red-500 text-sm">{errors.format}</p>
          )}
        </div>


        {formData.format === "material" && (
          <div>
            <label
              htmlFor="material"
              className="block text-sm font-medium mb-1"
            >
              Material*
            </label>
            <input
              id="material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.material && (
              <p className="text-red-500 text-sm">{errors.material}</p>
            )}
          </div>
        )}

        {formData.format === "hours" && (
          <div>
            <label htmlFor="hours" className="block text-sm font-medium mb-1">
              Horas*
            </label>
            <input
              id="hours"
              name="hours"
              type="number"
              value={formData.hours}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.hours && (
              <p className="text-red-500 text-sm">{errors.hours}</p>
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Descripción*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="workdate" className="block text-sm font-medium mb-1">
            Fecha*
          </label>
          <input
            id="workdate"
            name="workdate"
            type="date"
            value={formData.workdate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.workdate && (
            <p className="text-red-500 text-sm">{errors.workdate}</p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={() =>
              setFormData({
                clientId: "",
                projectId: "",
                format: "",
                material: "",
                hours: "",
                description: "",
                workdate: "",
              })
            }
          >
            Descartar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </form>

      {showModal && (
        <ModalConfirmacion
          mensaje="Albarán creado con éxito"
          onConfirm={(crearOtro) => {
            setShowModal(false);
            if (crearOtro) {
              setFormData({
                clientId: "",
                projectId: "",
                format: "",
                material: "",
                hours: "",
                description: "",
                workdate: "",
              });
            } else {
              window.location.href = "/albaranes";
            }
          }}
        />
      )}
    </div>
  );
};

export default FormularioAlbaran;
