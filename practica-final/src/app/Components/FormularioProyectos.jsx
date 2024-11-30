"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProjectForm = ({ onSubmit }) => {
  const initialValues = {
    nombreProyecto: "",
    codigoCliente: "",
    direccionCliente: "",
    emailCliente: "",
    codigoInterno: "",
  };

  const validationSchema = Yup.object({
    nombreProyecto: Yup.string().required("El nombre del proyecto es obligatorio"),
    codigoCliente: Yup.string().required("El código del cliente es obligatorio"),
    direccionCliente: Yup.string().required("La dirección es obligatoria"),
    emailCliente: Yup.string()
      .email("Debe ser un email válido")
      .required("El email es obligatorio"),
    codigoInterno: Yup.string().required("El código interno es obligatorio"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div className="mb-4">
              <label className="block font-medium mb-2">Nombre proyecto</label>
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
              <label className="block font-medium mb-2">Código</label>
              <Field
                type="text"
                name="codigoCliente"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Código del Cliente"
              />
              <ErrorMessage
                name="codigoCliente"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Dirección del Proyecto</label>
              <Field
                type="text"
                name="direccionCliente"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Dirección del Proyecto"
              />
              <ErrorMessage
                name="direccionCliente"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Email</label>
              <Field
                type="email"
                name="emailCliente"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Email del Cliente"
              />
              <ErrorMessage
                name="emailCliente"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Código interno del proyecto</label>
              <Field
                type="text"
                name="codigoInterno"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Código interno del Proyecto"
              />
              <ErrorMessage
                name="codigoInterno"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {status && <div className="text-green-500 mb-4">{status}</div>}

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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectForm;
