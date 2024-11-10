import React, { useState } from 'react';
import md5 from 'md5';

const publicKey = '3b83345eeb0ae240ef43ec5a680f098c';
const privateKey = '69ae5519f15ae8a494b158fdc8f529e7a9e278cc';
const ts = 100;
const hash = md5(ts + privateKey + publicKey);
const baseUrl = 'https://gateway.marvel.com/v1/public';

export const obtenerComics = async () => {
    try {
        const response = await fetch(`${baseUrl}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        const data = await response.json();
        return data.data ? data.data.results : null;
    } catch (error) {
        console.error('Error en la obtención de los cómics:', error);
        return null;
    }
};

export const obtenerDetallesComics = async (comicId) => {
    try {
        const response = await fetch(`${baseUrl}/comics/${comicId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        const data = await response.json();
        if (data.data) {
            const comic = data.data.results[0];

            const personajesResponse = await fetch(`${baseUrl}/comics/${comicId}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
            const personajesData = await personajesResponse.json();

            if (personajesData.data) {
                comic.personajes = personajesData.data.results.map((personaje) => {
                    return {
                        name: personaje.name,
                        thumbnail: personaje.thumbnail ? personaje.thumbnail : null // Asegura que `thumbnail` existe
                    };
                });
            }

            return comic;
        }
        return null;
    } catch (error) {
        console.error('Error en la obtención de los detalles del cómic:', error);
        return null;
    }
};

//Obtener personajes comic
export const obtenerPersonajesPopulares = async () => {
    try {
        const response = await fetch(`${baseUrl}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        const data = await response.json();
        console.log('Respuesta de la API de personajes populares:', data);
        return data.data ? data.data.results : null;
    } catch (error) {
        console.error('Error en la obtención de personajes populares:', error);
        return null;
    }
};


//Obtener detalles de un personaje
export const obtenerDetallesPersonaje = async (personajeId) => {
    try {
        const response = await fetch(`${baseUrl}/characters/${personajeId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        const data = await response.json();
        return data.data ? data.data.results[0] : null;
    } catch (error) {
        console.error('Error en la obtención de los detalles del personaje:', error);
        return null;
    }
};


const APIMarvel = () => {
    const [comics, setComics] = useState([]);
    const [comicDetails, setComicDetails] = useState(null);
    const [error, setError] = useState('');

    const cargarComics = async () => {
        const datos = await obtenerComics();
        if (datos) {
            setComics(datos);
        } else {
            setError('Error al obtener los cómics');
        }
    };

    const cargarDetallesComics = async (comicId) => {
        const detalles = await obtenerDetallesComics(comicId);
        if (detalles) {
            setComicDetails(detalles);
        } else {
            setError('Error al obtener los detalles del cómic');
        }
    };

    return (
        <div>
            <button onClick={cargarComics}>Obtener Cómics</button>

            {comics.length > 0 ? (
                <div>
                    {comics.map((comic) => (
                        <div key={comic.id}>
                            <h4>{comic.title}</h4>
                            <button onClick={() => cargarDetallesComics(comic.id)}>Ver detalles</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay comics disponibles</p>
            )}

            {comicDetails && (
                <div>
                    <h3>Detalles de {comicDetails.title}</h3>
                    <img
                        src={`${comicDetails.thumbnail.path}.${comicDetails.thumbnail.extension}`}
                        alt={comicDetails.title}
                    />
                    <p>{comicDetails.description || 'No description available.'}</p>
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default APIMarvel;