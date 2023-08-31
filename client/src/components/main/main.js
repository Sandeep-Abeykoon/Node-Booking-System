import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const [userData, setUserData] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Setting the token to the axios request headers
        const config = {
          headers: {
            "x-auth-token": localStorage.getItem('authToken'),
          },
        };

        const response = await axios.get(
          `https://fragile-sneakers-bee.cyclic.app/api/users/user-data?userId=${localStorage.getItem("userId")}`,
          config
        );

        setUserData(response.data);

      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();

  }, []);


  // To set the image url variable
  useEffect(() => {
    if (userData) {
      setImageName(userData.imageName);
    }
  }, [userData]);


  // To call the image url fetching function
  useEffect(() => {
    const fetchImageUrl = async (imageName) => {
      try {
        const response = await axios.post(
          `https://fragile-sneakers-bee.cyclic.app/api/files/get-image-url/`,
          { imageName }
        );
        const presignedUrl = response.data.presignedUrl;
        setImageUrl(presignedUrl);

      } catch (error) {
        console.log("Error fetching image url : ", error)
      }
    };
    fetchImageUrl();
  }, [imageName]);

  useEffect(() => {
    if(imageUrl) {
      console.log(imageUrl);
    }
  }, [imageUrl]);
  

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
        <img src="https://media.licdn.com/dms/image/C5603AQG7Ah3zXdLm-Q/profile-displayphoto-shrink_800_800/0/1647058746617?e=2147483647&v=beta&t=3JqGnN_3NPYUcBRU_JMbL9QTwahoFHYGlYdc8ke6qjE" alt="User's avatar" className={styles.user_image}/>
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
