import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerDetallesPersonaje } from './APIMarvel';

const DetallesPersonaje = () => {
    const { id: nombrePersonaje } = useParams(); 
    const [personaje, setPersonaje] = useState(null);
    const [error, setError] = useState('');

    const cargarDetallesSiEsNecesario = async () => {
        if (!personaje) {
            const detalles = await obtenerDetallesPersonaje(nombrePersonaje); 
            if (detalles) {
                setPersonaje(detalles);
            } else {
                setError('Error al obtener los detalles del personaje');
            }
        }
    };

    cargarDetallesSiEsNecesario();

    return (
        <div>
            <h2>Detalles del Personaje</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {personaje ? (
                <div>
                    <h3>{personaje.name}</h3>
                    <img
                        src={`${personaje.thumbnail.path}.${personaje.thumbnail.extension}`}
                        alt={personaje.name}
                    />
                    <p>{personaje.description || 'Sin descripción disponible'}</p>
                </div>
            ) : (
                <p>Cargando detalles...</p>
            )}
        </div>
    );
};

export default DetallesPersonaje;
