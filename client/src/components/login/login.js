import React, {useState} from "react";
import styles from "./styles.module.css";
import "../styles.common.css";
import { Link } from "react-router-dom";
import { loginUser } from "../../apiCalls/loginApiCalls";

const Login = () => {
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
      const response = await loginUser(data);

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
          <div className="overlay">
            <div className="spinner"></div>
          </div>
        }
        <div className={styles.left}>
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              minLength="8"
              className="input"
            />

            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="green_btn">
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className="white_btn">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
