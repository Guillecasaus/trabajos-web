import React, { useState } from 'react';
import { obtenerPersonajesPopulares } from './APIMarvel';
import { useNavigate } from 'react-router-dom';

const PersonajesComic = () => {
    const [personajes, setPersonajes] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const cargarPersonajesPopulares = async () => {
        const datos = await obtenerPersonajesPopulares();
        if (datos) {
            setPersonajes(datos);
        } else {
            setError('Error al obtener los personajes populares');
        }
    };

    return (
        <div>
            <h2>Personajes Populares</h2>
            <button onClick={cargarPersonajesPopulares}>Cargar Personajes</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="grid-container">
                {personajes.map((personaje) => {
                    console.log('Personaje:', personaje); // Verifica la estructura de cada personaje
                    return (
                        <div
                            key={personaje.id}
                            className="character-card"
                            onClick={() => navigate(`/characters/${personaje.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <h4>{personaje.name}</h4>
                            <img
                                src={`${personaje.thumbnail.path}.${personaje.thumbnail.extension}`}
                                alt={personaje.name}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PersonajesComic;
