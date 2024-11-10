import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function InviteForm() {
	const navigate = useNavigate();
	const [inviteText, setInviteText] = useState('');

	const handleCardClick = () => {
		navigate('/run/1');
	};

	const handleInputChange = (event) => {
		setInviteText(event.target.value);
	};

	const handleSubmit = () => {
		console.log('Invite text submitted:', inviteText);
		navigate('/sent-invite-list');
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
					value={inviteText}
					onChange={handleInputChange}
					sx={{ mb: 2 }}
				/>
				<TextField
					label='Pakveitimo tekstas'
					variant='outlined'
					fullWidth
					multiline
					rows={4}
					value={inviteText}
					onChange={handleInputChange}
					sx={{ mb: 2 }}
				/>
				<Button variant='contained' color='primary' fullWidth onClick={handleSubmit}>
					Siųsti pakvietimą
				</Button>
			</Box>
		</Box>
	);
}

export default InviteForm;
