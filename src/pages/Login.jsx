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

	const saveToken = (userToken) => {
		localStorage.setItem('token', userToken);
	};

	const saveUser = (user, otherData) =>{
		console.log(otherData);
		localStorage.setItem('user', user);
		localStorage.setItem('full_user', otherData);

		console.log(localStorage.getItem('full_user'));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Email:', email);
		console.log('Password:', password);

		fetch('http://localhost:5000/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: email,
				password: password,
			}),
		})
			.then((response) => response.json().then((data) => ({ status: response.status, body: data })))
			.then(({ status, body }) => {
				if (status === 200) {
					alert('Prisijungimas sėkmingas');
					saveToken(body.jwt);
					saveUser(body.userid, body.user);
					navigate('/run-list');
				} else {
					alert('Prisijungimas nepavyko: ' + body.error);
				}
			})
			.catch((error) => {
				console.error('Klaida:', error);
				if (error.message === 'Failed to fetch') {
					alert('Serveris nepasiekiamas');
				} else {
					alert('Klaida: ' + error.message);
				}
			});
	};

	const handleRegisterRedirect = () => {
		navigate('/register');
	};

	const handleChangePasswordRedirect = () => {
		navigate('/changepassword');
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
			<Typography variant='body2' sx={{ mb: 1 }}>
				Pamiršote slaptažodį?
			</Typography>
			<Button variant='text' color='primary' onClick={handleChangePasswordRedirect}>
				Pakeisti slaptažodį
			</Button>
		</Box>
	);
}

export default Login;
