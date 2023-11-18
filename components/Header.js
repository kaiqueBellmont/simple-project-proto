// components/Header.js

import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}></div>
            <nav className={styles.nav}>
                <a href="#">Planilha</a>
                <a href="#">Orçamento</a>
                <a href="#">Outro Link</a>
                <a href="#">Mais um Link</a>
            </nav>
        </header>
    );
};

export default Header;
