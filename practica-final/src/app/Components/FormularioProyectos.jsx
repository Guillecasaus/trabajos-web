import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Componente de confirmación
const ModalConfirmacion = ({ mensaje, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="text-center">
          <div className="text-4xl text-blue-500 mb-4">✔️</div>
          <h2 className="text-lg font-semibold mb-2">{mensaje}</h2>
          <p className="text-gray-500 mb-6">
            ¿Quieres crear otro proyecto o finalizar?
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

// Función para enviar datos a la API
const enviarProyectoAPI = async (values, setMensaje, setShowModal) => {
  try {
    const res = await fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const errorData = await res.json(); // Parsear el error devuelto por el backend
      console.error("Error devuelto por el backend:", errorData);
      throw new Error(errorData.error || "Error al crear el proyecto");
    }

    const data = await res.json();
    console.log("Proyecto creado con éxito:", data);
    setMensaje("Proyecto creado con éxito");
    setShowModal(true);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    setMensaje(error.message || "Hubo un error al procesar tu solicitud");
  }
};


const FormularioProyecto = () => {
  const [clientes, setClientes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("/api/client");
        const data = await res.json();
        console.log("Datos de clientes recibidos:", data); // Agregar esto para verificar los datos
        setClientes(data || []);
      } catch (error) {
        console.error("Error al obtener los clientes:", error.message);
      }
    };
    fetchClientes();
  }, []);


  const formik = useFormik({
    initialValues: {
      name: "",
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
      clientId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre del proyecto es obligatorio"),
      projectCode: Yup.string().required("El código del proyecto es obligatorio"),
      email: Yup.string()
        .email("Debe ser un email válido")
        .required("El email es obligatorio"),
      address: Yup.object().shape({
        street: Yup.string().required("La calle es obligatoria"),
        number: Yup.string().required("El número es obligatorio"),
        postal: Yup.string().required("El código postal es obligatorio"),
        city: Yup.string().required("La ciudad es obligatoria"),
        province: Yup.string().required("La provincia es obligatoria"),
      }),
      code: Yup.string().required("El código interno del proyecto es obligatorio"),
      clientId: Yup.string().required("Selecciona un cliente"),
    }),
    onSubmit: async (values) => {
      await enviarProyectoAPI(values, setMensaje, setShowModal);
      formik.resetForm();
    },
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Crear Proyecto</h2>
      {mensaje && (
        <p
          className={`mb-4 text-center ${mensaje.includes("éxito") ? "text-green-500" : "text-red-500"
            }`}
        >
          {mensaje}
        </p>
      )}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Nombre del Proyecto */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nombre del Proyecto*
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>

        {/* Código del Proyecto */}
        <div>
          <label htmlFor="projectCode" className="block text-sm font-medium mb-1">
            Identificador del Proyecto*
          </label>
          <input
            id="projectCode"
            type="text"
            name="projectCode"
            value={formik.values.projectCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.projectCode && formik.errors.projectCode && (
            <p className="text-red-500 text-sm">{formik.errors.projectCode}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email*
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

        {/* Dirección */}
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

        {/* Código Interno */}
        <div>
          <label htmlFor="code" className="block text-sm font-medium mb-1">
            Código Interno*
          </label>
          <input
            id="code"
            type="text"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.code && formik.errors.code && (
            <p className="text-red-500 text-sm">{formik.errors.code}</p>
          )}
        </div>

        {/* Cliente */}
        <div>
          <label htmlFor="clientId" className="block text-sm font-medium mb-1">
            Cliente*
          </label>
          <select
            id="clientId"
            name="clientId"
            value={formik.values.clientId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Selecciona un cliente</option>
            {clientes.map((cliente, index) => (
              <option key={cliente._id || `cliente-${index}`} value={cliente._id}>
                {cliente.name}
              </option>
            ))}
          </select>


          {formik.touched.clientId && formik.errors.clientId && (
            <p className="text-red-500 text-sm">{formik.errors.clientId}</p>
          )}
        </div>

        {/* Botones */}
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
            Guardar
          </button>
        </div>
      </form>

      {showModal && (
        <ModalConfirmacion
          mensaje="Proyecto creado con éxito"
          onConfirm={(crearOtro) => {
            setShowModal(false);
            if (crearOtro) {
              formik.resetForm();
            } else {
              window.location.href = "/proyectos";
            }
          }}
        />
      )}
    </div>
  );
};

export default FormularioProyecto;
