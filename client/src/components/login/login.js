import React, {useState} from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const url = `${apiUrl}/api/users/login`;
      const response = await axios.post(url, data);

      const { token, userId } = response.data;

      // Setting up the variables in the user storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userId);

      //Directing to profile page after logging in
      window.location = "/";

    } catch (error) {
      const errorMessage = error.response?.data?.message || 
      "Internal Server error. Please try again later";
      setError(errorMessage);
    }

    setLoading(false);

  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        {loading &&
          <div className={styles.overlay}>
            <div className={styles.spinner}></div>
          </div>
        }
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              minLength="8"
              className={styles.input}
            />

            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
