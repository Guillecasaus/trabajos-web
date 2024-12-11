"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ModalConfirmacion = ({ mensaje, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="text-center">
          <div className="text-4xl text-blue-500 mb-4">✔️</div>
          <h2 className="text-lg font-semibold mb-2">{mensaje}</h2>
          <p className="text-gray-500 mb-6">
            ¿Quieres crear otro cliente o finalizar?
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

const enviarClienteAPI = async (values, setMensaje, setShowModal) => {
  try {
    const res = await fetch("/api/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      console.log("Datos enviados al servidor:", values);
      setMensaje("Cliente creado con éxito");
      setShowModal(true);
    } else {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error al crear el cliente");
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    setMensaje("Hubo un error al procesar tu solicitud");
  }
};

const FormularioCliente = ({ clienteId }) => {
  const [mensaje, setMensaje] = useState("");
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      cif: "",
      address: {
        street: "",
        number: "",
        postal: "",
        city: "",
        province: "",
      },
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      cif: Yup.string()
        .matches(/^[A-Z0-9]+$/, "El CIF debe ser válido")
        .required("El CIF es obligatorio"),
      address: Yup.object().shape({
        street: Yup.string().required("La calle es obligatoria"),
        number: Yup.string().required("El número es obligatorio"),
        postal: Yup.string().required("El código postal es obligatorio"),
        city: Yup.string().required("La ciudad es obligatoria"),
        province: Yup.string().required("La provincia es obligatoria"),
      }),
    }),
    onSubmit: async (values) => {
      await enviarClienteAPI(values, setMensaje, setShowModal);
      formik.resetForm();
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
            Nombre del Cliente o Empresa*
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
          <label htmlFor="cif" className="block text-sm font-medium mb-1">
            CIF (si lo sabes)
          </label>
          <input
            id="cif"
            type="text"
            name="cif"
            value={formik.values.cif}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.cif && formik.errors.cif && (
            <p className="text-red-500 text-sm">{formik.errors.cif}</p>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2">Dirección</h3>
        <div>
          <label htmlFor="address.street" className="block text-sm font-medium mb-1">
            Calle*
          </label>
          <input
            id="address.street"
            type="text"
            name="address.street"
            value={formik.values.address.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.address?.street && formik.errors.address?.street && (
            <p className="text-red-500 text-sm">{formik.errors.address.street}</p>
          )}
        </div>

        <div>
          <label htmlFor="address.number" className="block text-sm font-medium mb-1">
            Número*
          </label>
          <input
            id="address.number"
            type="text"
            name="address.number"
            value={formik.values.address.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.address?.number && formik.errors.address?.number && (
            <p className="text-red-500 text-sm">{formik.errors.address.number}</p>
          )}
        </div>

        <div>
          <label htmlFor="address.postal" className="block text-sm font-medium mb-1">
            Código Postal*
          </label>
          <input
            id="address.postal"
            type="text"
            name="address.postal"
            value={formik.values.address.postal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.address?.postal && formik.errors.address?.postal && (
            <p className="text-red-500 text-sm">{formik.errors.address.postal}</p>
          )}
        </div>

        <div>
          <label htmlFor="address.city" className="block text-sm font-medium mb-1">
            Ciudad*
          </label>
          <input
            id="address.city"
            type="text"
            name="address.city"
            value={formik.values.address.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.address?.city && formik.errors.address?.city && (
            <p className="text-red-500 text-sm">{formik.errors.address.city}</p>
          )}
        </div>

        <div>
          <label htmlFor="address.province" className="block text-sm font-medium mb-1">
            Provincia*
          </label>
          <input
            id="address.province"
            type="text"
            name="address.province"
            value={formik.values.address.province}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.address?.province && formik.errors.address?.province && (
            <p className="text-red-500 text-sm">{formik.errors.address.province}</p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={() => formik.resetForm()}
          >
            Descartar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {clienteId ? "Actualizar Cliente" : "Guardar"}
          </button>
        </div>
      </form>

      {showModal && (
        <ModalConfirmacion
          mensaje="Cliente creado y guardado con éxito"
          onConfirm={(crearOtro) => {
            setShowModal(false);
            if (crearOtro) {
              formik.resetForm();
            } else {
              window.location.href = "/clientes";
            }
          }}
        />
      )}
    </div>
  );
};

export default FormularioCliente;
