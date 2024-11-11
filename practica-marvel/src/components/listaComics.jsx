import React, { useState } from 'react';
import { obtenerComics, obtenerDetallesComics } from './APIMarvel';
import styles from '../Styles/comics.module.css';

const obtenerFavoritos = () => {
    return JSON.parse(localStorage.getItem('favoritos')) || [];
};

const guardarFavoritos = (favoritos) => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
};

const agregarAFavoritos = (comic) => {
    let favoritos = obtenerFavoritos();
    if (!favoritos.some(fav => fav.id === comic.id)) {
        favoritos.push(comic);
        guardarFavoritos(favoritos);
    }
};

const eliminarDeFavoritos = (comicId) => {
    let favoritos = obtenerFavoritos();
    favoritos = favoritos.filter(fav => fav.id !== comicId);
    guardarFavoritos(favoritos);
};

const ListaComics = () => {
    const [comics, setComics] = useState([]);
    const [detallesComic, setDetallesComic] = useState(null);
    const [error, setError] = useState('');
    const [favoritos, setFavoritos] = useState(obtenerFavoritos());

    const obtenerListaComics = async () => {
        try {
            const datos = await obtenerComics();
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
            const detalles = await obtenerDetallesComics(comicId);
            if (detalles) {
                setDetallesComic(detalles);
            } else {
                setError('Error al obtener los detalles del cómic');
            }
        } catch (e) {
            setError('Error en la solicitud de detalles del cómic');
        }
    };

    const manejarAgregarFavorito = (comic) => {
        agregarAFavoritos(comic);
        setFavoritos(obtenerFavoritos());
    };

    const manejarEliminarFavorito = (comicId) => {
        eliminarDeFavoritos(comicId);
        setFavoritos(obtenerFavoritos());
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Lista de Cómics</h2>
            <button onClick={obtenerListaComics} className={styles.button}>Cargar Cómics</button>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.gridContainer}>
                {comics.length > 0 ? (
                    comics.map((comic) => (
                        <div key={comic.id} className={styles.comic}>
                            <h4>{comic.title}</h4>
                            <button onClick={() => seleccionarComic(comic.id)} className={styles.button}>Ver Detalles</button>
                            <button onClick={() => manejarAgregarFavorito(comic)} className={styles.button}>Agregar a Favoritos</button>
                        </div>
                    ))
                ) : (
                    <p className={styles.cargar - comics}>No se han cargado cómics. Haz clic en el botón para cargar.</p>
                )}
            </div>
            {detallesComic && (
                <div className={styles.comicDetails}>
                    <h2>Detalles de {detallesComic.title}</h2>
                    <img
                        src={`${detallesComic.thumbnail.path}.${detallesComic.thumbnail.extension}`}
                        alt={detallesComic.title}
                    />
                    <p>{detallesComic.description || 'Sin descripción disponible'}</p>
                    <h3>Personajes:</h3>
                    {detallesComic.personajes && detallesComic.personajes.length > 0 ? (
                        <div className={styles.characterGrid}>
                            {detallesComic.personajes.map((character, index) => (
                                <div key={index} className={styles.character}>
                                    <p>{character.name}</p>
                                    {character.thumbnail && character.thumbnail.path && character.thumbnail.extension ? (
                                        <img
                                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                            alt={character.name}
                                            className={styles.characterImage}
                                            onClick={() => window.location.href = `/characters/${character.name}`} 
                                            style={{ cursor: 'pointer' }} 
                                        />
                                    ) : (
                                        <p>Imagen no disponible</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No hay personajes disponibles.</p>
                    )}
                </div>
            )}
            <div className={styles.favoritos}>
                <h2>Favoritos</h2>
                {favoritos.length > 0 ? (
                    favoritos.map((fav) => (
                        <div key={fav.id}>
                            <h4>{fav.title}</h4>
                            <button onClick={() => manejarEliminarFavorito(fav.id)} className={styles.button}>Eliminar de Favoritos</button>
                        </div>
                    ))
                ) : (
                    <p>No hay cómics en favoritos.</p>
                )}
            </div>
        </div>
    );
};

export default ListaComics;
