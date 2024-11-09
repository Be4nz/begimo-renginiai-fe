import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Email:', email);
		console.log('Password:', password);
		navigate('/run-list');
	};

	const handleRegisterRedirect = () => {
		navigate('/register');
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
				Prisijungimas
			</Typography>

			{/* Form */}
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
					value={password}
					onChange={handlePasswordChange}
				/>

				<Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 2, mb: 2 }}>
					Prisijungti
				</Button>
			</Box>

			<Typography variant='body2' sx={{ mb: 1 }}>
				Dar neturite paskyros?
			</Typography>
			<Button variant='text' color='primary' onClick={handleRegisterRedirect}>
				Registracija
			</Button>
		</Box>
	);
}

export default Login;
