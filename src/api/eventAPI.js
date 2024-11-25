import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

export const postEvent = async (eventData) => {
    try {
        const response = await axiosInstance.post('/event/event/postevent', eventData);
        return response.data;
    } catch (error) {
        console.error('Error posting event:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchCities = async () => {
    try {
        const response = await axiosInstance.get('/event/cities');
        return response.data;
    } catch (error) {
        console.error('Error fetching cities:', error.response?.data || error.message);
        throw error;
    }
};
