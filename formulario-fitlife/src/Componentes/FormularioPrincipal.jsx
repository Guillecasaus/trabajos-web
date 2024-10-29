import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormularioPrincipal = () => {
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            telefono: '',
            direccion:'',
            ciudad:'',
            codigoPostal:'',
            tipoEntrenamiento: '',
            objetivos: '',
            disponibilidad: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            email: Yup.string().email('Introduce un email válido').required('El email es obligatorio'),
            telefono: Yup.string().required('El teléfono es obligatorio'),
            direccion: Yup.string().required('Direccion obligatoria'),
            ciudad: Yup.string().required('Ciudad es obligatoria'),
            códigoPostal: Yup.string().required('Código postal obligatorio'),
            tipoEntrenamiento: Yup.string().required('Selecciona un tipo de entrenamiento'),
            objetivos: Yup.string().required('Selecciona un objetivo de fitness'),
            disponibilidad: Yup.string().required('Selecciona tu disponibilidad'),
        }),
        onSubmit: (values) => {
            console.log('Formulario enviado:', values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h3>Registro en FitLife</h3>

            <input type="text" name="nombre" value={formik.values.nombre} onChange={formik.handleChange} placeholder="Nombre"/>
            {formik.errors.nombre && <p className="error">{formik.errors.nombre}</p>}
            <br></br>

            <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Email"/>
            {formik.errors.email && <p className="error">{formik.errors.email}</p>}
            <br></br>

            <input type="text" name="telefono" value={formik.values.telefono} onChange={formik.handleChange} placeholder="Telefono"/>
            {formik.errors.telefono && <p className="error">{formik.errors.telefono}</p>}
            <br></br>

            <input type="text" name="direccion" value={formik.values.direccion} onChange={formik.handleChange} placeholder="Dirección"/>
            {formik.errors.direccion && <p className="error">{formik.errors.direccion}</p>}
            <br></br>

            <input type="text" name="ciudad" value={formik.values.ciudad} onChange={formik.handleChange} placeholder="Ciudad"/>
            {formik.errors.ciudad && <p className="error">{formik.errors.ciudad}</p>}
            <br></br>

            <input type="text" name="codigoPostal" value={formik.values.codigoPostal} onChange={formik.handleChange} placeholder="Código Postal"/>
            {formik.errors.codigoPostal && <p className="error">{formik.errors.codigoPostal}</p>}
            <br></br>

            <select name="tipoEntrenamiento" value={formik.values.tipoEntrenamiento} onChange={formik.handleChange}>
                <option value="">Selecciona un tipo de entrenamiento</option>
                <option value="cardio">Cardio</option>
                <option value="fuerza">Fuerza</option>
                <option value="yoga">Yoga</option>
            </select>
            {formik.errors.tipoEntrenamiento && <p className="error">{formik.errors.tipoEntrenamiento}</p>}
            <br></br>

            <select name="objetivos" value={formik.values.objetivos} onChange={formik.handleChange}>
                <option value="">Selecciona un objetivo</option>
                <option value="perderPeso">Perder Peso</option>
                <option value="ganarMasa">Ganar Masa Muscular</option>
                <option value="mejorarResistencia">Mejorar Resistencia</option>
            </select>
            {formik.errors.objetivos && <p className="error">{formik.errors.objetivos}</p>}
            <br></br>

            <select name="disponibilidad" value={formik.values.disponibilidad} onChange={formik.handleChange}>
                <option value="">Selecciona tu disponibilidad</option>
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
            </select>
            {formik.errors.disponibilidad && <p className="error">{formik.errors.disponibilidad}</p>}
            <br></br>

            <button type="submit">Enviar</button>
        </form>
    );
};

export default FormularioPrincipal;
