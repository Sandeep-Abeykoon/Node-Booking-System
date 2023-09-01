import React from "react";
import { useState } from "react";
import styles from "./styles.module.css";
import "../styles.common.css";
import { Link, useNavigate } from "react-router-dom";
import { getPresignedUrl, uploadImage, registerUser } from "../../apiCalls/signupApiCalls";

const Signup = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    imageName: "",
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setUserData({ ...userData, [input.name]: input.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if(file.type.startsWith('image/')) {
        setError("");
        setImage(file);
        setImagePreviewUrl(URL.createObjectURL(file));

      } else {
        setImage(null);
        setImagePreviewUrl(null);
        setError("Please upload a valid image file");
      }
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (image) {
        // Getting the presigned url from the api
        const presignedUrlResponse = await getPresignedUrl(userData.email, image.type)

        if (
          presignedUrlResponse &&
          presignedUrlResponse.data &&
          presignedUrlResponse.data.presignedUrl
        ) 
        {
          // uploading the image to the server
          await uploadImage(presignedUrlResponse.data.presignedUrl,
            image,
            image.type
            );
          // Setting the image name to the userdata
          userData.imageName =  presignedUrlResponse.data.filename;

        } else {
          setError("Failed to upload image. Please try again later.");
        }
      }

      // Registering the user
      const response = await registerUser(userData);
      alert(response.data.message);
      navigate("/login");

    } catch (error) {
      const errorMessage = error.response?.data?.message || 
      "Internal Server error. Please try again later";
      setError(errorMessage);
    }

    setLoading(false);

  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        {loading &&
          <div className="overlay">
            <div className="spinner"></div>
          </div>
        }
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="white_btn">
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className={styles.fields_container}>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={userData.firstName}
                required
                className="input"
              />
              <input
                type="text"
                placeholder="last Name"
                name="lastName"
                onChange={handleChange}
                value={userData.lastName}
                required
                className="input"
              />
              <input
                type="text"
                placeholder="Mobile Number"
                name="mobileNumber"
                onChange={handleChange}
                value={userData.mobileNumber}
                required
                className="input"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={userData.email}
                required
                className="input"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={userData.password}
                required
                minLength="8"
                className="input"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="input"
              />

              {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className={styles.thumbnail}></img>}
            </div>

            <div className={styles.actions_container}>
              {error && <div className="error_msg">{error}</div>}
              <button type="submit" className="green_btn">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
