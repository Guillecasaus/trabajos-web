"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProjectForm = ({ onSubmit }) => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("/api/client");
        if (res.ok) {
          const data = await res.json();
          setClientes(data); // Guardar la lista de clientes
        } else {
          setError("Error al obtener la lista de clientes");
        }
      } catch (error) {
        setError("Error al procesar la solicitud");
      }
    };

    fetchClientes();
  }, []);

  const initialValues = {
    nombreProyecto: "",
    projectCode: "",
    email: "",
    address: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
    code: "",
    ClientId: "",
  };

  const validationSchema = Yup.object({
    nombreProyecto: Yup.string().required("El nombre del proyecto es obligatorio"),
    projectCode: Yup.string().required("El código del proyecto es obligatorio"),
    email: Yup.string().email("Debe ser un email válido").required("El email es obligatorio"),
    address: Yup.object({
      street: Yup.string().required("La calle es obligatoria"),
      number: Yup.string().required("El número es obligatorio"),
      postal: Yup.string().required("El código postal es obligatorio"),
      city: Yup.string().required("La ciudad es obligatoria"),
      province: Yup.string().required("La provincia es obligatoria"),
    }),
    code: Yup.string().required("El código interno es obligatorio"),
    ClientId: Yup.string().required("Debe seleccionar un cliente"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    console.log("Valores enviados:", values);
    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("¡Proyecto creado exitosamente!");
        resetForm();
      } else {
        const errorData = await res.json();
        setStatus(errorData.error || "Error al crear el proyecto");
      }
    } catch (error) {
      setStatus("Error al procesar la solicitud");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Añadir o Editar Proyecto</h2>
      {error && <p className="text-red-500">{error}</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div className="mb-4">
              <label className="block font-medium mb-2">Nombre del Proyecto</label>
              <Field
                type="text"
                name="nombreProyecto"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Nombre del Proyecto"
              />
              <ErrorMessage
                name="nombreProyecto"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Código del Proyecto</label>
              <Field
                type="text"
                name="projectCode"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Código del Proyecto"
              />
              <ErrorMessage
                name="projectCode"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Seleccionar Cliente</label>
              <Field
                as="select"
                name="ClientId"
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Seleccione un cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente._id} value={cliente._id}>
                    {cliente.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="ClientId"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Otros campos como dirección, email y código interno */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Email del Cliente</label>
              <Field
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Email del Cliente"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Dirección del Proyecto */}
            <h3 className="font-bold mb-2">Dirección del Proyecto</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">Calle</label>
              <Field
                type="text"
                name="address.street"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Calle"
              />
              <ErrorMessage
                name="address.street"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            {/* Otros campos de dirección */}
            <div className="flex justify-between">
              <button
                type="reset"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Descartar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </div>
            {status && <div className="text-green-500 mt-4">{status}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectForm;
