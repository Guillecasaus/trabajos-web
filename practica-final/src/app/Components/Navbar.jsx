"use client";

import Link from "next/link";
import LogOut from "@/app/Components/LogOut";
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
          <Link href="/albaranes" className={styles.navLink}>
            Albaranes
          </Link>
        </li>
        <li>
          <Link href="/Proveedores" className={styles.navLink}>
            Proveedores
          </Link>
        </li>
      </ul>
      {/* Botón de cierre de sesión */}
      <div className="mt-auto p-4">
        <LogOut />
      </div>
    </nav>
  );
};

export default Navbar;
