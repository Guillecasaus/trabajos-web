import React from 'react';
import styles from '../Styles/form.module.css';

const PreferenciasEntrenamiento = ({ formik }) => (
  <div>
    <h4>Preferencias de Entrenamiento</h4>
    
    <select
      name="tipoEntrenamiento"
      value={formik.values.tipoEntrenamiento}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <option value="">Selecciona un tipo de entrenamiento</option>
      <option value="cardio">Cardio</option>
      <option value="fuerza">Fuerza</option>
      <option value="yoga">Yoga</option>
    </select>
    {formik.touched.tipoEntrenamiento && formik.errors.tipoEntrenamiento && (
      <p className={styles.error}>{formik.errors.tipoEntrenamiento}</p>
    )}
    
    <select
      name="objetivos"
      value={formik.values.objetivos}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <option value="">Selecciona un objetivo</option>
      <option value="perderPeso">Perder Peso</option>
      <option value="ganarMasa">Ganar Masa Muscular</option>
      <option value="mejorarResistencia">Mejorar Resistencia</option>
    </select>
    {formik.touched.objetivos && formik.errors.objetivos && (
      <p className={styles.error}>{formik.errors.objetivos}</p>
    )}
    
    <select
      name="disponibilidad"
      value={formik.values.disponibilidad}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <option value="">Selecciona tu disponibilidad</option>
      <option value="mañana">Mañana</option>
      <option value="tarde">Tarde</option>
      <option value="noche">Noche</option>
    </select>
    {formik.touched.disponibilidad && formik.errors.disponibilidad && (
      <p className={styles.error}>{formik.errors.disponibilidad}</p>
    )}
  </div>
);

export default PreferenciasEntrenamiento;
