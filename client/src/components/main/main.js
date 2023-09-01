import styles from "./styles.module.css";
import "../styles.common.css";
import React, { useState, useEffect } from "react";
import { getUserData, getSavedFile } from "../../apiCalls/mainApiCalls";

const Main = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDataAndImage = async () => {
      try {
        const userDataResponse = await getUserData();
        setUserData(userDataResponse.data);

        if (userDataResponse.data?.imageName) {
          const imageUrlResponse = await getSavedFile(userDataResponse.data.imageName);
          setUserData(prevData => ({ ...prevData, imageUrl: imageUrlResponse.data.presignedUrl }));
        }

        setLoading(false);
        
      } catch (error) {
        alert("Server error");
      }
    };

    fetchUserDataAndImage();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  const { _, firstName, lastName, mobileNumber, email } = userData || {};

  return (
    <div className={styles.main_container}>
      {loading &&
          <div className="overlay">
            <div className="spinner"></div>
          </div>
        }
      <nav className={styles.navbar}>
        <h1>DISPENSARY</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.user_data_container}>
        <div className={styles.image_container}>
          <img src={userData?.imageUrl} alt="User's avatar" className={styles.user_image} />
        </div>
        <h2 className={styles.user_heading}>{firstName} {lastName}</h2>
        <div className={styles.user_data}>
          <p><span className={styles.bold}>Mobile Number : &nbsp;</span>{mobileNumber}</p>
          <p><span className={styles.bold}>Email : &nbsp;</span>{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Main;