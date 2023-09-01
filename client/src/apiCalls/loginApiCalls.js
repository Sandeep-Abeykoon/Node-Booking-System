import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const loginUser = async (userCredentials) => {
const url = `${apiUrl}/api/users/login`;
return await axios.post(url, userCredentials);
}