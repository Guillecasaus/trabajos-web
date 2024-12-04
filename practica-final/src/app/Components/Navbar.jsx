"use client";

import Link from "next/link";
import styles from "../Styles/Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.logoText}>Overview</h1>
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/dashboard" className={styles.navLink}>
                        Resumen
                    </Link>
                </li>
                <li>
                    <Link href="/clientes" className={styles.navLink}>
                        Clientes
                    </Link>
                </li>
                <li>
                    <Link href="/proyectos" className={styles.navLink}>
                        Proyectos
                    </Link>
                </li>
                <li>
                    <Link href="/Albaranes" className={styles.navLink}>
                        Albaranes
                    </Link>
                </li>
                <li>
                    <Link href="/Proveedores" className={styles.navLink}>
                        Proveedores
                    </Link>
                </li>
                <li>
                    <Link href="/Ajustes" className={styles.navLink}>
                        Ajustes
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
