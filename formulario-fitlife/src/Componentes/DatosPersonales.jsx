import React from 'react';
import styles from '../Styles/form.module.css';

const DatosPersonales = ({ formik }) => {
  return (
    <div>
      <h4>Datos Personales</h4>
      <input 
        type="text" 
        name="nombre" 
        placeholder="Nombre"
        value={formik.values.nombre} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur} 
      />
      {formik.touched.nombre && formik.errors.nombre ? (
        <p className={styles.error}>{formik.errors.nombre}</p>
      ) : null}

      <input 
        type="text" 
        name="email" 
        placeholder="Email"
        value={formik.values.email} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email ? (
        <p className={styles.error}>{formik.errors.email}</p>
      ) : null}

      <input 
        type="text" 
        name="telefono" 
        placeholder="Teléfono"
        value={formik.values.telefono} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
      />
      {formik.touched.telefono && formik.errors.telefono ? (
        <p className={styles.error}>{formik.errors.telefono}</p>
      ) : null}
    </div>
  );
};

export default DatosPersonales;
