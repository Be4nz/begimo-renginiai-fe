import axios from 'axios';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000',
	headers: {
		Authorization: 'Bearer ' + localStorage.getItem('token'),
	},
});

export const fetchUserByEmail = async (email) => {
	try {
		const response = await axiosInstance.get(`/user/get/email/${email}`);
		if (response.data) {
			return response.data;
		} else {
			return null;
		}
	} catch (error) {
		console.error('Error fetching user by email:', error.response?.data || error.message);
		throw error;
	}
};

export const fetchUserById = async (id) => {
	try {
		const response = await axiosInstance.get(`/user/get/${id}`);
		if (response.data) {
			return response.data;
		} else {
			return null;
		}
	} catch (error) {
		console.error('Error fetching user by id:', error.response?.data || error.message);
		throw error;
	}
};

export const checkUserIsOrganizer = async (userId) => {
	try {
		const response = await axiosInstance.get(`/user/is-organizer/${userId}`);
		return response.data.isOrganizer;
	} catch (error) {
		console.error('Error checking if user is organizer:', error.response?.data || error.message);
		throw error;
	}
};

export const checkUserIsAdmin = async (userId) => {
	try {
		const response = await axiosInstance.get(`/user/is-admin/${userId}`);
		return response.data.isAdmin;
	} catch (error) {
		console.error('Error checking if user is admin:', error.response?.data || error.message);
		throw error;
	}
};

export const checkUserCanCreateEvent = async (userId) => {
	try {
		const isOrganizerResponse = await axiosInstance.get(`/user/is-organizer/${userId}`);
		const isOrganizer = isOrganizerResponse.data.isOrganizer;

		const isAdminResponse = await axiosInstance.get(`/user/is-admin/${userId}`);
		const isAdmin = isAdminResponse.data.isAdmin;

		if (isOrganizer && isAdmin) {
			return false;
		}

		if (isOrganizer) {
			return true;
		}

		return false;
	} catch (error) {
		console.error('Error checking if user can create event:', error.response?.data || error.message);
		throw error;
	}
};




