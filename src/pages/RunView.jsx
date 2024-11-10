import React from 'react';
import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RunView() {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate('/run/1/comments');
	};

	const handleInviteClick = () => {
		navigate('/invite-form');
	};

	const handleEditRun = () => {
		navigate('/edit-run/1');
	};

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
				Bėgimas
			</Typography>

			{/* Clickable Card */}
			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
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
							Komentarai
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>

			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
				<CardActionArea onClick={handleInviteClick}>
					<CardContent>
						<Typography
							variant='h5'
							component='div'
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Siūsti pakvietmą
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>

			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
				<CardActionArea onClick={handleEditRun}>
					<CardContent>
						<Typography
							variant='h5'
							component='div'
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Redaguoti bėgimą
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Box>
	);
}

export default RunView;
