import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getPresignedUrl = async (email, fileType) => {
    const url = `${apiUrl}/api/files/get-presigned-url?email=${email}&filetype=${fileType}`;
    return axios.get(url);
};


export const uploadImage = async (presignedUrl, image, imageType) => {
    return axios.put(presignedUrl, image, {
        headers: {
            "Content-Type": imageType
        }
    });
};


export const registerUser = async (userData) => {
    const url =  `${apiUrl}/api.users/register`;
    return axios.post(url, userData);
};


