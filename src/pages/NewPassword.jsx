import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function NewPassword() {
	const navigate = useNavigate();

	const code = useParams().id;
	const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
	const [email, setEmail] = useState('');

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange1 = (e) => {
		setPassword1(e.target.value);
	};

    const handlePasswordChange2 = (e) => {
		setPassword2(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password1 !== password2) {
			alert("Slaptažodžiai nesutampa")
			return;
		}
		try {
			const response = await fetch('http://localhost:5000/user/change-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password: password1, code }),
			});
			if (!response.ok) {
				console.log(response)
				alert("Sistemos klaida. Bandykite dar kartą vėliau")
				return;
			}
			alert("Slaptažodis pakeistas")
			
		} catch (error) {
			alert("Sistemos klaida: " + error)
			return;
		}

		navigate("/login")

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
				Pakeisti slaptažodį
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
				<TextField
					fullWidth
					margin='normal'
					label='Slaptažodis'
					type='password'
					variant='outlined'
					required
					value={password1}
					onChange={handlePasswordChange1}
				/>
                <TextField
					fullWidth
					margin='normal'
					label='Pakartokite slaptažodį'
					type='password'
					variant='outlined'
					required
					value={password2}
					onChange={handlePasswordChange2}
				/>

				<Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 2, mb: 2 }}>
					Pakeisti slaptažodį
				</Button>
			</Box>
		</Box>
	);
}

export default NewPassword;
