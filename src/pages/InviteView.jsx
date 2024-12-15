import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Button, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import InviteDeleteConfirm from '../components/modal/InviteDeleteConfirm';
import { fetchInvitationById, deleteInvitation } from '../api/inviteAPI'; // Import API calls

function InviteView() {
	const { id } = useParams(); // Get invite ID from URL params
	const navigate = useNavigate();
	const [invite, setInvite] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isModalOpen, setModalOpen] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility
	const [successMessage, setSuccessMessage] = useState(''); // State to hold success message

	// Fetch invite details when component mounts
	useEffect(() => {
		const loadInvite = async () => {
			try {
				const data = await fetchInvitationById(id); // Fetch invite details by ID
				console.log(data);
				setInvite(data);
			} catch (error) {
				console.error('Error fetching invite details:', error);
				setError('Nepavyko gauti pakvietimo informacijos.');
			} finally {
				setLoading(false);
			}
		};

		loadInvite();
	}, [id]);

	// Handle invite deletion and navigate back to the invite list
	const handleDeleteInvite = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleConfirmDelete = async () => {
		try {
			await deleteInvitation(id); // Delete the invitation using API
			console.log(`Invitation with ID ${id} deleted.`);
			setSuccessMessage('Kvietimas sėkmingai pašalintas.');
			setOpenSnackbar(true); // Show success Snackbar
			navigate('/invite-list'); // Navigate back to invite list
		} catch (error) {
			console.error(`Error deleting invitation with ID ${id}:`, error);
			setError('Nepavyko pašalinti pakvietimo.');
		} finally {
			setModalOpen(false);
		}
	};

	// Handle invite acceptance and navigate to event registration page
	const handleAcceptInvite = () => {
		navigate(`/register-event/${invite.renginio_id}`);
		deleteInvitation(id);
	};

	// Close the Snackbar
	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	if (loading) {
		return (
			<Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' padding={3}>
				<Typography variant='h6' color='error'>
					{error}
				</Typography>
				<Button variant='contained' onClick={() => navigate('/invite-list')} sx={{ marginTop: 2 }}>
					Grįžti į pakvietimų sąrašą
				</Button>
			</Box>
		);
	}

	return (
		<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' padding={3}>
			<Typography variant='h3' component='h1' sx={{ fontWeight: 'bold', marginBottom: 3, letterSpacing: 2 }}>
				Pakvietimo informacija
			</Typography>

			{invite && (
				<Card sx={{ width: '100%', maxWidth: 600, boxShadow: 3 }}>
					<CardContent>
						<Typography variant='h6' color='primary' gutterBottom>
							Siuntėjas: {invite.siuntejo_id}
						</Typography>

						<Typography variant='body1' gutterBottom>
							<strong>Žinutė:</strong> {invite.tekstas}
						</Typography>

						<Typography variant='body2' color='text.secondary'>
							<strong>Data:</strong> {new Date(invite.data).toISOString().split('T')[0]}{' '}
						</Typography>
					</CardContent>
				</Card>
			)}

			<Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 600, marginTop: 3 }}>
				<Button variant='contained' color='primary' onClick={() => navigate('/invite-list')} sx={{ width: '30%' }}>
					Grįžti
				</Button>
				<Button variant='contained' color='success' onClick={handleAcceptInvite} sx={{ width: '30%' }}>
					Priimti pakvietimą
				</Button>
				<Button variant='outlined' color='error' onClick={handleDeleteInvite} sx={{ width: '30%' }}>
					Pašalinti pakvietimą
				</Button>
			</Box>

			{/* Delete Confirmation Modal */}
			<InviteDeleteConfirm open={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />

			{/* Snackbar for success message */}
			<Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
				<Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
					{successMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default InviteView;
