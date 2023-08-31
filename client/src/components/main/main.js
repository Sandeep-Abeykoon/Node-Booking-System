import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://fragile-sneakers-bee.cyclic.app/api";

const Main = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDataAndImage = async () => {
      try {
        const config = {
          headers: {
            "x-auth-token": localStorage.getItem('authToken'),
          },
        };

        const userResponse = await axios.get(
          `${BASE_URL}/users/user-data?userId=${localStorage.getItem("userId")}`,
          config
        );

        setUserData(userResponse.data);

        if (userResponse.data?.imageName) {
          const imageResponse = await axios.post(
            `${BASE_URL}/files/get-image-url/`,
            { imageName: userResponse.data.imageName }
          );
          setUserData(prevData => ({ ...prevData, imageUrl: imageResponse.data.presignedUrl }));
        }
        
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchUserDataAndImage();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>DISPENSARY</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.user_data_container}>
        <img src={userData?.imageUrl || 'fallback_image_url_here'} alt="User's avatar" className={styles.user_image} />
        <h2 className={styles.user_heading}>{userData?.firstName} {userData?.lastName}</h2>
        <div className={styles.user_data}>
          <p><span className={styles.bold}>Mobile Number : &nbsp;</span>{userData?.mobileNumber}</p>
          <p><span className={styles.bold}>Email : &nbsp;</span>{userData?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Main;