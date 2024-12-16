import axios from 'axios';

// Create an axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // You can adjust this based on your backend URL
});

// Function to fetch all registrations or registrations for a specific event
export const getRegistrations = async (eventId) => {
    try {
        const response = await axiosInstance.get(`/register/registrations/${eventId}`); // Use axiosInstance instead of API_URL
        return response.data;
    } catch (error) {
        console.error('Error fetching registrations:', error);
        throw error; // Propagate error to be handled in the component
    }
};

// Function to register a user for an event
export const registerUser = async (userId, eventId, sendReminders) => {
    try {
        const response = await axiosInstance.post(`/register/register-event`, { // Use axiosInstance instead of API_URL
            naudotojo_id: userId,
            renginio_id: eventId,
            send_reminders: sendReminders
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Propagate error to be handled in the component
    }
};

// Function to update a registration
export const updateRegistration = async (userId, eventId, sendReminders) => {
    try {
        const response = await axiosInstance.put(`/register/update-registration`, {
            naudotojo_id: userId,
            renginio_id: eventId,
            send_reminders: sendReminders
        });
        return response.data;  // Return the data directly
    } catch (error) {
        console.error('Error updating registration:', error);
        throw error; // Propagate error to be handled in the component
    }
};


// Function to delete a registration
export const deleteRegistration = async (registrationId, userId) => {

    const response = await fetch(`/api/registrations/${registrationId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
        throw new Error('Failed to delete registration');
    }

    return await response.json();
};

export const addEventToGoogleCalendar = async (eventId, sendReminders) => {
    try {
        const response = await axios.post('/register/add-event-to-calendar', { eventId, sendReminders });
        console.log('Google Calendar response:', response);
        return response.data;
    } catch (error) {
        console.error('Error adding event to Google Calendar:', error);
        throw error; // Rethrow to propagate the error
    }
};
