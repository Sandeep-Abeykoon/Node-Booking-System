import React from "react";
import { useState } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    imageName: "",
  });

  const [image, setImage] = useState(null);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setUserData({ ...userData, [input.name]: input.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (image) {
        // Getting the presigned url from the api
        const presignedUrlResponse = await axios.get(
          `https://fragile-sneakers-bee.cyclic.app/api/files/get-presigned-url?email=${userData.email}&filetype=${image.type}`
        );

        if (
          presignedUrlResponse &&
          presignedUrlResponse.data &&
          presignedUrlResponse.data.presignedUrl
        ) 
        {
          await axios.put(presignedUrlResponse.data.presignedUrl, image, {
            headers: {
              "Content-Type": image.type,
            },
          });

          // Setting the image name after getting the predefined url
          userData.imageName = presignedUrlResponse.data.filename;
        } else {
          setError("Failed to upload image. Please try again later.");
        }
      }

      // Registering the user
      const url = `https://fragile-sneakers-bee.cyclic.app/api/users/register`;
      const response = await axios.post(url, userData);

      alert(response.data?.message);
      navigate("/login");

    } catch (error) {
      console.error(error);
      setError(error.response?.data.message);
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={userData.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="last Name"
              name="lastName"
              onChange={handleChange}
              value={userData.lastName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              name="mobileNumber"
              onChange={handleChange}
              value={userData.mobileNumber}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={userData.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={userData.password}
              required
              className={styles.input}
            />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
