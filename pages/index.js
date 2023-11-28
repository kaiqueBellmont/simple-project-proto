// pages/index.js

import React, { useState } from 'react';
import styles from './index.module.scss';
import Header from '@/components/Header';
import ProductCrud from '@/components/ProductCrud';
import Footer from '@/components/Footer';

const Index = () => {
    const [showProductCrud, setShowProductCrud] = useState(false);

    const handleShowProductCrud = () => {
        setShowProductCrud(true);
    };

    return (
        <div className={styles.home__container}>
            <Header onShowProductCrud={handleShowProductCrud} />
            <div className={styles.content}>
                {showProductCrud && (
                    <div className={styles.product__container}>
                        <ProductCrud />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Index;
