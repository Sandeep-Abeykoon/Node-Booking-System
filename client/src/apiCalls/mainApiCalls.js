import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;


export const getUserData = async () => {
    const url = `${apiUrl}/api/users/user-data?userId=${localStorage.getItem("userId")}`

    return await axios.get(url,
        {
            headers: {
              "x-auth-token": localStorage.getItem('authToken'),
            },
          }
       );
    };


export const getSavedFile = async (filename) => {
    const url = `${apiUrl}/api/files/get-image-url/`

    return await axios.post(
        url,
        { filename },
        {
            headers: {
              "x-auth-token": localStorage.getItem('authToken'),
            },
          }
    );
};
