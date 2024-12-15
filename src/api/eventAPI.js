import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

export const fetchPublicEvents = async () => {
    try {
        const response = await axiosInstance.get('/event/events/public');
        return response.data;
    } catch (error) {
        console.error('Error fetching public events:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchPrivateEvents = async () => {
    try {
        const response = await axiosInstance.get('/event/events/private');
        return response.data;
    } catch (error) {
        console.error('Error fetching public events:', error.response?.data || error.message);
        throw error;
    }
};

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

export const fetchEventById = async (id) => {
    try {
        const response = await axiosInstance.get(`/event/event/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching event by ID:', error.response?.data || error.message);
        throw error;
    }
};

export const editEventById = async (eventId, updatedData) => {
    try {
        const response = await axiosInstance.put(`/event/update/${eventId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error editing event:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteEventById = async (eventId) => {
    try {
        const response = await axiosInstance.delete(`/event/deleteevent/${eventId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting event:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchEventWeather = async (id) => {
    try {
        const response = await axiosInstance.get(`/event/${id}/weather`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

export const fetchDistances = async () => {
    try {
        const response = await axiosInstance.get('/event/distances');
        return response.data;
    } catch (error) {
        console.error('Error fetching distances:', error.response?.data || error.message);
        throw error;
    }
};
