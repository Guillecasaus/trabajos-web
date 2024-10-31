import React from 'react';
import styles from '../Styles/form.module.css';

const DatosPago = ({ formik }) => (
  <div>
    <h4>Datos de Pago</h4>
    
    <select
      name="metodoPago"
      value={formik.values.metodoPago}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <option value="">Selecciona un método de pago</option>
      <option value="tarjetaCredito">Tarjeta de Crédito</option>
      <option value="tarjetaDebito">Tarjeta de Débito</option>
    </select>
    {formik.touched.metodoPago && formik.errors.metodoPago && (
      <p className={styles.error}>{formik.errors.metodoPago}</p>
    )}
    
    <input
      type="text"
      name="numeroTarjeta"
      value={formik.values.numeroTarjeta}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      placeholder="Número de Tarjeta"
    />
    {formik.touched.numeroTarjeta && formik.errors.numeroTarjeta && (
      <p className={styles.error}>{formik.errors.numeroTarjeta}</p>
    )}
  </div>
);

export default DatosPago;
