// components/Header.js

import React, { useState } from 'react';
import styles from './Header.module.scss';
import OrcamentoModal from './OrcamentoModal';

const Header = ({ onShowProductCrud, products }) => {
    const [isOrcamentoModalOpen, setIsOrcamentoModalOpen] = useState(false);

    const handleShowOrcamentoModal = () => {
        setIsOrcamentoModalOpen(true);
    };

    const handleCloseOrcamentoModal = () => {
        setIsOrcamentoModalOpen(false);
    };

    const handleEnviarParaWhatsapp = (pdfFile) => {
        // Aqui você pode adicionar a lógica para enviar o arquivo PDF para o WhatsApp
        // Pode envolver o uso de APIs específicas ou outras bibliotecas
        console.log('Enviando PDF para o WhatsApp:', pdfFile);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}></div>
            <nav className={styles.nav}>
                <a href="#" onClick={onShowProductCrud}>
                    Planilha
                </a>
                <a href="#" onClick={handleShowOrcamentoModal}>
                    Orçamento
                </a>
            </nav>

            <OrcamentoModal
                isOpen={isOrcamentoModalOpen}
                onRequestClose={handleCloseOrcamentoModal}
                onEnviarParaWhatsapp={handleEnviarParaWhatsapp}
                products={products}
            />
        </header>
    );
};

export default Header;
