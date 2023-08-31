import React from 'react'
import { useState } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const[data, setData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "https://fragile-sneakers-bee.cyclic.app/api/users/login";
            const response = await axios.post(url, data);

            const token = response.data.token;
            const userId = response.data.userId;

            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', userId);

            window.location = "/"

        } catch (error) {
            console.error(error);
            setError(error.response.data.message);
        }
    }

  return (
    <div className={styles.login_container}>
        <div className={styles.login_form_container}>
            <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Login to Your Account</h1>
               
                    <input 
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                        required
                        className={styles.input}
                    />
                    <input 
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        required
                        className={styles.input}
                    />
                  
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type='submit' className={styles.green_btn}>
                        Sign In
                    </button>
                </form> 
            </div>
            <div className={styles.right}>
            <h1>New Here ?</h1>
                <Link to="/signup">
                    <button type='button' className={styles.white_btn}>
                        Sign Up
                    </button>
                </Link>
                
            </div>
        </div>
    </div>
  )
}

export default Login;