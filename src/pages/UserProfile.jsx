import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';

function UserProfile() {
	const [isEditing, setIsEditing] = useState(false);
	const [profile, setProfile] = useState({
		name: 'Vardenis Pavardenis',
		email: 'vardenis@pavardenis.lt',
		phone: '+3700000000',
	});

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProfile((prevProfile) => ({
			...prevProfile,
			[name]: value
		}));
	};

	return (
		<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh' padding={3}>
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
			<Box sx={{ width: '100%', maxWidth: 600, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
				{isEditing ? (
					<>
						<TextField
							label='Vardas'
							name='name'
							value={profile.name}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
						<TextField
							label='El. paštas'
							name='email'
							value={profile.email}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
						<TextField
							label='Tel. numeris'
							name='phone'
							value={profile.phone}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
					</>
				) : (
					<>
						<Typography variant='h6'>Vardas: {profile.name}</Typography>
						<Typography variant='h6'>El. paštas: {profile.email}</Typography>
						<Typography variant='h6'>Tel. numeris: {profile.phone}</Typography>
					</>
				)}
			</Box>
			<Button variant='contained' color='primary' onClick={handleEditClick} sx={{ marginTop: 2 }}>
				{isEditing ? 'Išsaugoti' : 'Pakeisti'}
			</Button>
		</Box>
	);
}

export default UserProfile;
