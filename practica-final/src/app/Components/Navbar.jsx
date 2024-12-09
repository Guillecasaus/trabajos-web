"use client";

import Link from "next/link";
import LogOut from "@/app/Components/LogOut";
import styles from "../Styles/Navbar.module.css";
import {
    AiOutlineUser,
    AiOutlineProject,
    AiOutlineFileText,
    AiOutlineSetting,
    AiOutlineHome,
} from "react-icons/ai";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/dashboard">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className={styles.logoImage}
                    />
                </Link>
            </div>

            <ul className={styles.navLinks}>
                <h1 className={styles.logoText}>OVERVIEW</h1>
                <li>
                    <Link href="/dashboard" className={styles.navLink}>
                        <AiOutlineHome className={styles.navIcon} /> Resumen
                    </Link>
                </li>
                <li>
                    <Link href="/clientes" className={styles.navLink}>
                        <AiOutlineUser className={styles.navIcon} /> Clientes
                    </Link>
                </li>
                <li>
                    <Link href="/proyectos" className={styles.navLink}>
                        <AiOutlineProject className={styles.navIcon} /> Proyectos
                    </Link>
                </li>
                <li>
                    <Link href="/albaranes" className={styles.navLink}>
                        <AiOutlineFileText className={styles.navIcon} /> Albaranes
                    </Link>
                </li>
                <li>
                    <Link href="/ajustes" className={styles.navLink}>
                        <AiOutlineSetting className={styles.navIcon} /> Ajustes
                    </Link>
                </li>
            </ul>

            <div className="mt-auto p-4">
                <LogOut />
            </div>
        </nav>
    );
};

export default Navbar;
