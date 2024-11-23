"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const enviarClienteAPI = async (values, setMensaje) => {
  try {
    const res = await fetch(
      "https://bildy-rpmaya.koyeb.app/api/client",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (res.ok) {
      setMensaje("Cliente creado con éxito");
    } else {
      throw new Error("Error al crear el cliente");
    }
  } catch (error) {
    setMensaje("Hubo un error al procesar tu solicitud");
  }
};

const FormularioCliente = ({ clienteId }) => {
  const [mensaje, setMensaje] = useState("");

  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      email: Yup.string()
        .email("Introduce un email válido")
        .required("El email es obligatorio"),
    }),
    onSubmit: async (values) => {
      if (clienteId) {

        try {
          const response = await fetch(
            `https://bildy-rpmaya.koyeb.app/api/client/${clienteId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }
          );

          if (response.ok) {
            setMensaje("Cliente actualizado con éxito");
          } else {
            throw new Error("Error al actualizar el cliente");
          }
        } catch (error) {
          setMensaje("Hubo un error al procesar tu solicitud");
        }
      } else {
        await enviarClienteAPI(values, setMensaje);
        formik.resetForm();
      }
    },
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {clienteId ? "Editar Cliente" : "Crear Cliente"}
      </h2>
      {mensaje && (
        <p
          className={`mb-4 text-center ${
            mensaje.includes("éxito") ? "text-green-500" : "text-red-500"
          }`}
        >
          {mensaje}
        </p>
      )}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-1">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.nombre && formik.errors.nombre && (
            <p className="text-red-500 text-sm">{formik.errors.nombre}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {clienteId ? "Actualizar Cliente" : "Crear Cliente"}
        </button>
      </form>
    </div>
  );
};

export default FormularioCliente;
