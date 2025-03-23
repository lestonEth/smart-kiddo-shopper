import axios from 'axios';
import { handleApiError } from '.';

const API_URL = 'http://192.168.100.10:5000/api/users';


// get all children of the parent
export const getChildren = async () => {
    try {
        const response = await axios.get(`${API_URL}/children`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};


// delete a child
export const deleteChild = async (childId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/child/${childId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}