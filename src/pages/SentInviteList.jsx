import React from 'react';
import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SentInviteList() {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate('/invite-list');
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
				Išsiūsti pakietimai
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
							Grįžti į gautus pakvietimus
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Box>
	);
}

export default SentInviteList;
