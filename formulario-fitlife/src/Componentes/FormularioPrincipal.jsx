import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatosPersonales from './DatosPersonales';
import InformacionContacto from './InformacionContacto';
import PreferenciasEntrenamiento from './PreferenciasEntrenamiento';
import DatosPago from './DatosPago';
import styles from '../Styles/form.module.css';

const enviarDatosAPI = async (datos, setMensaje) => {
  try {
    const respuesta = await fetch('https://api.fitlife.com/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    if (respuesta.ok) {
      setMensaje('Usuario registrado correctamente');
    } else {
      setMensaje('Error al registrar usuario');
    }
  } catch (error) {
    setMensaje('Error en la conexión al servidor');
  }
};

const FormularioPrincipal = () => {
  const [mensaje, setMensaje] = useState(''); 

  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      codigoPostal: '',
      tipoEntrenamiento: '',
      objetivos: '',
      disponibilidad: '',
      metodoPago: '',
      numeroTarjeta: '',
      equipoAdicional: '', 
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      email: Yup.string().email('Introduce un email válido').required('El email es obligatorio'),
      telefono: Yup.string()
        .matches(/^\d+$/, 'Introduce solo números en el teléfono')
        .required('El teléfono es obligatorio'),
      direccion: Yup.string().required('Dirección obligatoria'),
      ciudad: Yup.string().required('La ciudad es obligatoria'),
      codigoPostal: Yup.string().required('Código postal obligatorio'),
      tipoEntrenamiento: Yup.string().required('Selecciona un tipo de entrenamiento'),
      objetivos: Yup.string().required('Selecciona un objetivo de fitness'),
      disponibilidad: Yup.string().required('Selecciona tu disponibilidad'),
      metodoPago: Yup.string().required('Selecciona un método de pago'),
      numeroTarjeta: Yup.string()
        .matches(/^\d{16}$/, 'El número de tarjeta debe tener 16 dígitos')
        .required('Número de tarjeta es obligatorio'),
      equipoAdicional: Yup.string(), 
    }),
    onSubmit: (values) => {
      enviarDatosAPI(values, setMensaje);  
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formulario}>
      <h3 className={styles.titulo}>Registro en FitLife</h3>
      
      <DatosPersonales formik={formik} />
      <InformacionContacto formik={formik} />
      <PreferenciasEntrenamiento formik={formik} />
      <DatosPago formik={formik} />

      <button type="submit" className={styles.boton}>
        Enviar
      </button>

      {mensaje && <p className={mensaje.includes('Error') ? styles.error : styles.exito}>{mensaje}</p>}
    </form>
  );
};

export default FormularioPrincipal;
