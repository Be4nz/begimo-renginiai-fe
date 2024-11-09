import React from 'react';
import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';

function UserProfile() {
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
				Vartotojo profilis
			</Typography>
		</Box>
	);
}

export default UserProfile;
