import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLoginRedirect = () => {
		navigate('/login');
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Username:', username);
		console.log('Email:', email);
		console.log('Password:', password);
		navigate('/login');
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
				Registracija
			</Typography>

			<Box component='form' noValidate sx={{ width: '100%', maxWidth: 400 }} onSubmit={handleSubmit}>
				<TextField
					fullWidth
					margin='normal'
					label='Naudotojo vardas'
					variant='outlined'
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					fullWidth
					margin='normal'
					label='El. paštas'
					type='email'
					variant='outlined'
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					fullWidth
					margin='normal'
					label='Slaptažodis'
					type='password'
					variant='outlined'
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 2, mb: 2 }}>
					Registruotis
				</Button>
			</Box>

			<Typography variant='body2' sx={{ mb: 1 }}>
				Jau turite paskyra?
			</Typography>
			<Button variant='text' color='primary' onClick={handleLoginRedirect}>
				Prisijungimas
			</Button>
		</Box>
	);
}

export default Register;
