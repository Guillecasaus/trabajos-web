import React, { useState } from 'react';

const FormularioSolicitud = ({ mascota }) => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensaje(`Gracias por solicitar la adopción de ${mascota.nombre}`);
    };

    return (
        <div className="formulario-solicitud">
            <h2>Formulario de Adopción</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div>
                    <label>Dirección:</label>
                    <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </div>
                <button type="submit">Enviar Solicitud</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default FormularioSolicitud;
