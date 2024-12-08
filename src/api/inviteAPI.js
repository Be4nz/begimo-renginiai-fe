import axios from 'axios';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000',
});

// Fetch all invitations
export const fetchAllInvitations = async () => {
	try {
		const response = await axiosInstance.get('/invite');
		return response.data;
	} catch (error) {
		console.error('Error fetching all invitations:', error.response?.data || error.message);
		throw error;
	}
};

// Fetch a specific invitation by ID
export const fetchInvitationById = async (id) => {
	try {
		const response = await axiosInstance.get(`/invite/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching invitation with ID ${id}:`, error.response?.data || error.message);
		throw error;
	}
};

// Fetch invitations by sender ID
export const fetchInvitationsBySenderId = async (senderId) => {
	try {
		const response = await axiosInstance.get(`/invite/sender/${senderId}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching invitations by sender ID ${senderId}:`, error.response?.data || error.message);
		throw error;
	}
};

// Fetch invitations by receiver ID
export const fetchInvitationsByReceiverId = async (receiverId) => {
	try {
		const response = await axiosInstance.get(`/invite/receiver/${receiverId}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching invitations by receiver ID ${receiverId}:`, error.response?.data || error.message);
		throw error;
	}
};

// Create a new invitation
export const createInvitation = async (invitationData) => {
	try {
		const response = await axiosInstance.post('/invite', invitationData);
		return response.data;
	} catch (error) {
		console.error('Error creating invitation:', error.response?.data || error.message);
		throw error;
	}
};

// Update an existing invitation by ID
export const updateInvitation = async (id, updatedData) => {
	try {
		const response = await axiosInstance.put(`/invite/${id}`, updatedData);
		return response.data;
	} catch (error) {
		console.error(`Error updating invitation with ID ${id}:`, error.response?.data || error.message);
		throw error;
	}
};

// Delete an invitation by ID
export const deleteInvitation = async (id) => {
	try {
		const response = await axiosInstance.delete(`/invite/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error deleting invitation with ID ${id}:`, error.response?.data || error.message);
		throw error;
	}
};
