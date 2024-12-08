import axios from 'axios';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000',
});

// Fetch all invitations
export const fetchUserByEmail = async (email) => {
	try {
		const response = await axiosInstance.get(`/user/get/email/${email}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching user by email:', error.response?.data || error.message);
		throw error;
	}
};
