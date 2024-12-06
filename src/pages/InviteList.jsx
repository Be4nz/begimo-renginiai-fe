import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	Card,
	CardActionArea,
	CardContent,
	List,
	ListItem,
	ListItemText,
	CircularProgress,
	Divider,
	Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InviteDeleteConfirm from '../components/modal/InviteDeleteConfirm';
import { fetchInvitationsByReceiverId, deleteInvitation } from '../api/inviteAPI'; // Import API calls

function InviteList() {
	const navigate = useNavigate();
	const [invites, setInvites] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedInviteId, setSelectedInviteId] = useState(null);

	const receiverId = '2'; // Replace with dynamic receiver ID (e.g., from context or localStorage)

	// Fetch received invites based on receiver ID
	useEffect(() => {
		const loadInvites = async () => {
			try {
				const data = await fetchInvitationsByReceiverId(receiverId); // Fetch received invites by receiver ID
				setInvites(data);
			} catch (error) {
				console.error('Error fetching received invites:', error);
			} finally {
				setLoading(false);
			}
		};
		loadInvites();
	}, [receiverId]);

	// Open delete confirmation modal
	const handleDeleteInvite = (inviteId) => {
		setSelectedInviteId(inviteId);
		setModalOpen(true);
	};

	// Close the delete confirmation modal
	const handleCloseModal = () => {
		setModalOpen(false);
		setSelectedInviteId(null);
	};

	// Confirm and delete the invitation
	const handleConfirmDelete = async () => {
		if (selectedInviteId) {
			try {
				await deleteInvitation(selectedInviteId); // Delete the invitation using API
				setInvites((prevInvites) => prevInvites.filter((invite) => invite.id !== selectedInviteId));
				console.log(`Invitation with ID ${selectedInviteId} deleted.`);
			} catch (error) {
				console.error(`Error deleting invitation with ID ${selectedInviteId}:`, error);
			} finally {
				setModalOpen(false);
				setSelectedInviteId(null);
			}
		}
	};

	// Accept invitation (placeholder for actual function)
	const handleAcceptInvite = () => {
		console.log('Invite accepted!');
		// You can implement accepting invitation functionality here
	};

	return (
		<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' padding={3}>
			{/* Title */}
			<Typography variant='h3' component='h1' sx={{ fontWeight: 'bold', marginBottom: 3, letterSpacing: 2 }}>
				Gauti pakvietimai
			</Typography>

			{/* Loading State */}
			{loading ? (
				<CircularProgress />
			) : (
				// Display list of received invites
				<List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
					{invites.map((invite) => (
						<ListItem
							key={invite.id}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								mb: 2,
								borderRadius: 2,
								boxShadow: 1,
								padding: 2,
								bgcolor: '#f9f9f9',
								'&:hover': {
									bgcolor: '#f1f1f1',
								},
							}}
						>
							<ListItemText
								primary={<Typography variant='h6' color='primary'>{`From: ${invite.siuntejo_id}`}</Typography>}
								secondary={<Typography variant='body2'>{`Message: ${invite.tekstas}`}</Typography>}
								sx={{ marginBottom: 1 }}
							/>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
								<Button variant='contained' color='success' onClick={handleAcceptInvite} sx={{ width: '45%' }}>
									Priimti kvietimą
								</Button>
								<Button
									variant='outlined'
									color='error'
									onClick={() => handleDeleteInvite(invite.id)}
									sx={{ width: '45%' }}
								>
									Pašalinti
								</Button>
							</Box>
						</ListItem>
					))}
				</List>
			)}

			{/* Delete Confirmation Modal */}
			<InviteDeleteConfirm open={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
		</Box>
	);
}

export default InviteList;
