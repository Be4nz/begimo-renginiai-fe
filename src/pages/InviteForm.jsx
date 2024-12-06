import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createInvitation } from '../api/inviteAPI'; // Import the API call

function InviteForm() {
	const navigate = useNavigate();
	const [email, setEmail] = useState(''); // State for email
	const [inviteText, setInviteText] = useState(''); // State for invitation text
	const [loading, setLoading] = useState(false); // State to manage submission state

	const handleCardClick = () => {
		navigate('/run/1');
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleTextChange = (event) => {
		setInviteText(event.target.value);
	};

	const handleSubmit = async () => {
		setLoading(true); // Show loading state
		try {
			const invitationData = {
				tekstas: inviteText,
				data: new Date().toISOString().split('T')[0], // Today's date
				statusas: 'Pending', // Default status
				siuntejo_id: 1, // Hardcoded sender ID (replace with dynamic ID if available)
				gavejo_id: 2, // Hardcoded recipient ID (replace with dynamic ID based on email lookup)
				renginio_id: 5, // Hardcoded event ID (replace with dynamic selection if available)
			};

			const response = await createInvitation(invitationData);
			console.log('Invitation created successfully:', response);
			navigate('/sent-invite-list'); // Redirect after successful submission
		} catch (error) {
			console.error('Error creating invitation:', error);
			alert('Failed to send the invitation. Please try again.');
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	return (
		<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh' padding={3}>
			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, mb: 2 }}>
				<CardActionArea onClick={handleCardClick}>
					<CardContent>
						<Typography
							variant='h5'
							component='div'
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Grįžti į renginį
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>

			{/* Invite creation form */}
			<Box
				component='form'
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				sx={{ width: '100%', maxWidth: 300 }}
			>
				<Typography variant='h6' textAlign='center' mb={2}>
					Pakvietimas
				</Typography>
				<TextField
					label='Kviečiamo vartotojo el. paštas'
					variant='outlined'
					fullWidth
					multiline
					rows={1}
					value={email}
					onChange={handleEmailChange}
					sx={{ mb: 2 }}
				/>
				<TextField
					label='Pakvietimo tekstas'
					variant='outlined'
					fullWidth
					multiline
					rows={4}
					value={inviteText}
					onChange={handleTextChange}
					sx={{ mb: 2 }}
				/>
				<Button variant='contained' color='primary' fullWidth onClick={handleSubmit} disabled={loading}>
					{loading ? 'Siunčiama...' : 'Siųsti pakvietimą'}
				</Button>
			</Box>
		</Box>
	);
}

export default InviteForm;
