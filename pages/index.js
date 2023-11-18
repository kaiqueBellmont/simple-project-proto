import React from 'react'
import styles from './index.module.scss'
import Header from '@/components/Header'

const index = () => {
    return (
        <div className={styles.home__container}>
            <Header />
        </div>
    )
}

export default index