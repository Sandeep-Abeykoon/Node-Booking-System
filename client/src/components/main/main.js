import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import { getUserData, getSavedFile } from "../../apiCalls/mainApiCalls";

const Main = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDataAndImage = async () => {
      try {
        const userDataResponse = await getUserData();
        setUserData(userDataResponse.data);

        if (userDataResponse.data?.imageName) {
          const imageUrlResponse = await getSavedFile(userDataResponse.data.imageName);
          setUserData(prevData => ({ ...prevData, imageUrl: imageUrlResponse.data.presignedUrl }));
        };
        
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

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>DISPENSARY</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.user_data_container}>
        <img src={userData?.imageUrl} alt="User's avatar" className={styles.user_image} />
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