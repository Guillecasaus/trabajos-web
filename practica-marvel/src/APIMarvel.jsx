import React, { useState } from 'react';
import md5 from 'md5';

const publicKey = '3b83345eeb0ae240ef43ec5a680f098c';
const privateKey = '69ae5519f15ae8a494b158fdc8f529e7a9e278cc';
const ts = 100;
const hash = md5(ts + privateKey + publicKey);

const APIMarvel = () => {
    const [comics, setComics] = useState([]);
    const [comicDetails, setComicDetails] = useState(null);
    const [error, setError] = useState('');

    const obtenerComics = async () => {
        try {
            const response = await fetch(`https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
            const data = await response.json();
            if (data.data) {
                setComics(data.data.results);
            } else {
                setError('Error al obtener los cómics');
            }
        } catch (error) {
            setError('Error en la obtención de los cómics');
            console.error('Error al obtener los cómics:', error);
        }
    };

    const obtenerDetallesComics = async (comicId) => {
        try {
            const response = await fetch(`https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
            const data = await response.json();
            if (data.data) {
                setComicDetails(data.data.results[0]);
            } else {
                setError('Error al obtener los detalles del cómic');
            }
        } catch (error) {
            setError('Error en la obtención de los detalles del cómic');
            console.error('Error al obtener los detalles del cómic:', error);
        }
    };

    return (
        <div>
            <button onClick={obtenerComics}>Obtener Cómics</button>

            {comics.length > 0 ? (
                <div>
                    {comics.map((comic) => (
                        <div key={comic.id}>
                            <h4>{comic.title}</h4>
                            <button onClick={() => obtenerDetallesComics(comic.id)}>Ver detalles</button>
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
