import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const [userData, setUserData] = useState({});
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Setting the token to the axios request headers
        const config = {
          headers: {
            "x-auth-token": localStorage.getItem("authToken"),
          },
        };

        const response = await axios.get(
          `https://fragile-sneakers-bee.cyclic.app/api/users/user-data`,
          config
        );
        setUserData(response.data);
        setImageName(response.data.imageName);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchUserData();
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
    </div>
  );
};

export default Main;
