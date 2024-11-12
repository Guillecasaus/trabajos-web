import React from 'react';
import styles from '../Styles/comics.module.css';

const VentanaComic = ({ detallesComic, cerrarVentana }) => {
    if (!detallesComic) return null;

    return (
        <div className={styles.ventanaComicOverlay}>
            <div className={styles.ventanaComicContent}>
                <button onClick={cerrarVentana} className={styles.closeButton}>Cerrar</button>
                <h2>{detallesComic.title}</h2>
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
        </div>
    );
};

export default VentanaComic;
