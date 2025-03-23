
// Handle API responses with error codes
const handleApiError = (error: any) => {
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


export { handleApiError };