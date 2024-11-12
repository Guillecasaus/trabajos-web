import React, { useState } from 'react';
import { obtenerComics, obtenerDetallesComics } from './APIMarvel';
import VentanaComic from './VentanaComic'; // Importa el componente de la ventana
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
    const [isVentanaComicOpen, setIsVentanaComicOpen] = useState(false); 
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

    const abrirVentanaComic = async (comicId) => {
        try {
            const detalles = await obtenerDetallesComics(comicId);
            if (detalles) {
                setDetallesComic(detalles);
                setIsVentanaComicOpen(true); 
            } else {
                setError('Error al obtener los detalles del cómic');
            }
        } catch (e) {
            setError('Error en la solicitud de detalles del cómic');
        }
    };

    const cerrarVentanaComic = () => {
        setIsVentanaComicOpen(false);
        setDetallesComic(null);
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
                            <img
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={comic.title}
                                className={styles.comicImage}
                            />
                            <h4>{comic.title}</h4>
                            <button onClick={() => abrirVentanaComic(comic.id)} className={styles.button}>Ver Detalles</button>
                            <button onClick={() => manejarAgregarFavorito(comic)} className={styles.button}>Agregar a Favoritos</button>
                        </div>
                    ))
                ) : (
                    <p className={styles.cargarComics}>No se han cargado cómics. Haz clic en el botón para cargar.</p>
                )}
            </div>

            {isVentanaComicOpen && (
                <VentanaComic detallesComic={detallesComic} cerrarVentana={cerrarVentanaComic} />
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
