"use client";

import { useEffect, useState } from "react";
import styles from "../Styles/encabezado.module.css";

const Encabezado = ({ tituloPagina }) => {
  const [usuario, setUsuario] = useState({ nombre: " ", foto: null});

  useEffect(() => {
    // Obtener los datos del usuario desde localStorage
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioGuardado) {
      setUsuario({
        nombre: usuarioGuardado.nombre,
        foto: usuarioGuardado.foto || "/user-avatar.png", // Usa un avatar predeterminado si no hay foto
      });
    }
  }, []);

  return (
    <header className={styles.encabezado}>
      <h1 className={styles.titulo}>{tituloPagina}</h1>
    <div className={styles.buscador}>
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.inputBuscador}
          />
        </div>
      <div className={styles.derecha}>
        <div className={styles.notificaciones}>
          <img
            src="/notification-icon.png"
            alt="Notificaciones"
            className={styles.icono}
          />
        </div>

        <div className={styles.usuario}>
          <img
            src={usuario.foto}
            alt="Foto de perfil"
            className={styles.fotoPerfil}
          />
          <span className={styles.nombre}>{usuario.nombre}</span>
        </div>
      </div>
    </header>
  );
};

export default Encabezado;
