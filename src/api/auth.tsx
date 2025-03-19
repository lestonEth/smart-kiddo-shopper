import axios from 'axios';
import { parseJSON } from 'date-fns';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your backend URL

// Handle API responses with error codes
const handleApiError = (error) => {
    if (error.response) {
        // Server responded with a status code outside 2xx
        const { status, data } = error.response;
        switch (status) {
            case 400:
                throw { message: data.message || 'Bad request. Please check your input.' };
            case 401:
                throw { message: data.message || 'Unauthorized. Invalid credentials.' };
            case 403:
                throw { message: data.message || 'Forbidden. You do not have permission.' };
            case 404:
                throw { message: data.message || 'Resource not found.' };
            case 409:
                throw { message: data.message || 'Conflict. Duplicate entry detected.' };
            case 500:
                throw { message: data.message || 'Internal server error. Please try again later.' };
            default:
                throw { message: data.message || 'An unexpected error occurred.' };
        }
    } else if (error.request) {
        // No response received from server
        throw { message: 'No response from the server. Check your connection.' };
    } else {
        // Something happened in setting up the request
        throw { message: 'Request error. Please try again.' };
    }
};

// Register User
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Login User
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const { token, user } = response.data;
        console.log(user)
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user))
        return { token, user, success: true }
    } catch (error) {
        handleApiError(error);
    }
};

// Logout User
export const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
};

// Check if user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
};
