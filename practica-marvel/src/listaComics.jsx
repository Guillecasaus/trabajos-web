import React, { useState } from 'react';
import APIMarvel from './APIMarvel';

const ListaComics = () => {
    const [comics, setComics] = useState([]);
    const [detallesComic, setDetallesComic] = useState(null);
    const [error, setError] = useState('');

    const obtenerListaComics = async () => {
        try {
            const datos = await APIMarvel.obtenerComics();
            if (datos) {
                setComics(datos);
            } else {
                setError('Error al obtener los cómics');
            }
        } catch (e) {
            setError('Error en la solicitud de cómics');
        }
    };

    const seleccionarComic = async (comicId) => {
        try {
            const detalles = await APIMarvel.o(comicId);
            if (detalles) {
                setDetallesComic(detalles);
            } else {
                setError('Error al obtener los detalles del cómic');
            }
        } catch (e) {
            setError('Error en la solicitud de detalles del cómic');
        }
    };

    return (
        <div>
            <h2>Lista de Cómics</h2>
            <button onClick={obtenerListaComics}>Cargar Cómics</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {comics.length > 0 ? (
                comics.map((comic) => (
                    <div key={comic.id}>
                        <h4>{comic.title}</h4>
                        <button onClick={() => seleccionarComic(comic.id)}>Ver Detalles</button>
                    </div>
                ))
            ) : (
                <p>No se han cargado cómics. Haz clic en el botón para cargar.</p>
            )}
            {detallesComic && (
                <div>
                    <h2>Detalles de {detallesComic.title}</h2>
                    <img
                        src={`${detallesComic.thumbnail.path}.${detallesComic.thumbnail.extension}`}
                        alt={detallesComic.title}
                    />
                    <p>{detallesComic.description || 'Sin descripción disponible'}</p>
                </div>
            )}
        </div>
    );
};

export default ListaComics;
