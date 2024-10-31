import React from 'react';
import styles from '../Styles/form.module.css';

const InformacionContacto = ({ formik }) => (
  <div>
    <h4>Información de Contacto</h4>
    
    <input
      type="text"
      name="direccion"
      value={formik.values.direccion}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      placeholder="Dirección"
    />
    {formik.touched.direccion && formik.errors.direccion && (
      <p className={styles.error}>{formik.errors.direccion}</p>
    )}
    
    <input
      type="text"
      name="ciudad"
      value={formik.values.ciudad}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      placeholder="Ciudad"
    />
    {formik.touched.ciudad && formik.errors.ciudad && (
      <p className={styles.error}>{formik.errors.ciudad}</p>
    )}
    
    <input
      type="text"
      name="codigoPostal"
      value={formik.values.codigoPostal}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      placeholder="Código Postal"
    />
    {formik.touched.codigoPostal && formik.errors.codigoPostal && (
      <p className={styles.error}>{formik.errors.codigoPostal}</p>
    )}
  </div>
);

export default InformacionContacto;
