// components/Footer.js

import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_content}>
                <div className={styles.footer_logo}></div>
                <nav className={styles.footer_nav}>
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
