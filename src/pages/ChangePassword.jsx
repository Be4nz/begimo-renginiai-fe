import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

function NewPassword() {
	const [email, setEmail] = useState('');


	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:5000/user/forgot-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});
			if (!response.ok) {
				throw new Error();
			}
		} catch (error) {
			alert("Sistemos klaida. Bandykite dar kartą vėliau")
			return;
		}
		alert("Į jūsų el. paštą buvo išsiųstos tolesnės slaptažodžio pakeitimo instrukcijos")
	};

	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			height='100vh'
			bgcolor='#f5f5f5'
			padding={3}
		>
			<Typography variant='h4' gutterBottom>
				Įveskite savo el. pašto adresą
			</Typography>
			<Box component='form' noValidate onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
				<TextField
					fullWidth
					margin='normal'
					label='El. paštas'
					type='email'
					variant='outlined'
					required
					value={email}
					onChange={handleEmailChange}
				/>
				<Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 2, mb: 2 }}>
					Pakeisti slaptažodį
				</Button>
			</Box>
		</Box>
	);
}

export default NewPassword;
