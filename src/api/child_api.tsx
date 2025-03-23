import axios from 'axios';
import { handleApiError } from '.';

const API_URL = 'https://shopmeai-backend.onrender.com/api/children';

export const registerChild = async (childData: any) => {
    console.log(childData);
    try {
        const response = await axios.post(`${API_URL}/register`, childData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}