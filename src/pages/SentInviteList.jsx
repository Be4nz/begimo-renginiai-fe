import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchInvitationsBySenderId } from '../api/inviteAPI'; // Import the API call
import { fetchUserById } from '../api/userAPI'; // Import the API call to fetch user by ID

function SentInviteList() {
	const navigate = useNavigate();
	const [invitations, setInvitations] = useState([]); // State to store fetched invitations
	const [loading, setLoading] = useState(true); // State for loading status
	const [error, setError] = useState(''); // State for error message
	const [userEmails, setUserEmails] = useState({}); // Store user emails by ID to prevent redundant fetches

	const senderId = localStorage.getItem('user'); // Assume user ID is stored in localStorage

	useEffect(() => {
		const getInvitations = async () => {
			try {
				// Fetch invitations for the current sender
				const fetchedInvitations = await fetchInvitationsBySenderId(senderId);
				setInvitations(fetchedInvitations); // Store fetched invitations
			} catch (err) {
				// Handle error and display message
				setError('Klaida įkeliant pakvietimus.');
			} finally {
				setLoading(false); // Set loading to false after fetching
			}
		};

		getInvitations(); // Fetch invitations on component mount
	}, [senderId]);

	useEffect(() => {
		// Fetch user emails for each recipient (gavejo_id) and store them
		const fetchUserEmails = async () => {
			const emailDetails = {};

			for (const invitation of invitations) {
				const { gavejo_id } = invitation;
				console.log(gavejo_id);
				if (!emailDetails[gavejo_id]) {
					try {
						const user = await fetchUserById(gavejo_id);
						console.log(user);
						if (user) {
							emailDetails[gavejo_id] = user.el_pastas;
						}
					} catch (err) {
						console.error(`Error fetching user with ID ${gavejo_id}`, err);
					}
				}
			}

			console.log(emailDetails);

			setUserEmails(emailDetails); // Set fetched user emails
		};

		// Fetch user emails only after invitations have been fetched
		if (invitations.length > 0) {
			fetchUserEmails();
		}
	}, [invitations]);

	// Handle card click navigation to another page (e.g., back to invite list)
	const handleCardClick = () => {
		navigate('/invite-list');
	};

	// If there's an error, display the error message
	if (error) {
		return (
			<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh' padding={3}>
				<Alert severity='error'>{error}</Alert>
			</Box>
		);
	}

	// If loading, show loading spinner
	if (loading) {
		return (
			<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh' padding={3}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh' padding={3}>
			{/* Title */}
			<Typography
				variant='h3'
				component='h1'
				sx={{
					fontWeight: 'bold',
					marginBottom: 3,
					letterSpacing: 2,
				}}
			>
				Išsiųsti pakvietimai
			</Typography>

			{/* Invitations List */}
			{invitations.length === 0 ? (
				<Typography variant='h6' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
					Jūs neturite išsiųstų pakvietimų.
				</Typography>
			) : (
				invitations.map((invitation) => (
					<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, mb: 2 }} key={invitation.id}>
						<CardActionArea onClick={handleCardClick}>
							<CardContent>
								<Typography variant='h5' component='div' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
									{invitation.tekstas}
								</Typography>
								<Typography variant='body2' sx={{ textAlign: 'center' }}>
									{new Date(invitation.data).toISOString().split('T')[0]}{' '}
								</Typography>
								{/* Display recipient's email */}
								{userEmails[invitation.gavejo_id] && (
									<Typography variant='body2' sx={{ textAlign: 'center', mt: 1 }}>
										<br />
										<span style={{ fontWeight: 'bold' }}>Pakviestas: </span>
										{userEmails[invitation.gavejo_id]} {/* Display the email */}
									</Typography>
								)}
							</CardContent>
						</CardActionArea>
					</Card>
				))
			)}

			{/* Clickable Card to go back */}
			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, mt: 2 }}>
				<CardActionArea onClick={handleCardClick}>
					<CardContent>
						<Typography variant='h5' component='div' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
							Grįžti į gautus pakvietimus
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Box>
	);
}

export default SentInviteList;
