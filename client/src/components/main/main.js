import styles from './styles.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async => {
            
        }
    })

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.reload();
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>DISPENSARY</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </div>
    );
}

export default Main;