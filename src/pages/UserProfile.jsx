import React from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

function UserProfile() {
	const [isEditing, setIsEditing] = useState(false);
	const [profile, setProfile] = useState({});
	const [loading, setLoading] = useState(true);

	const userId = useParams().id;
	const currentUserId = localStorage.getItem('user');

	React.useEffect(() => {
		fetch(`http://localhost:5000/user/get/${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setProfile(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error:', error);
				setLoading(false);
				if (error.message === 'Failed to fetch') {
					alert('Serveris nepasiekiamas');
				} else {
					alert('Klaida: ' + error.message);
				}
			});
	}, [userId]);

	const handleEditClick = () => {
		if (isEditing) {
			const updatedProfile = { ...profile };
			Object.keys(updatedProfile).forEach(key => {
				if (updatedProfile[key] === '') {
					updatedProfile[key] = null;
				}
			});

			fetch(`http://localhost:5000/user/update/${userId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify(updatedProfile),
			})
				.then((response) => response.json())
				.then((data) => {
					alert('Profilis atnaujintas sėkmingai');
					setProfile(data);
					window.location.reload();
				})
				.catch((error) => {
					console.error('Error:', error);
					alert('Klaida: ' + error.message);
				});
		}
		setIsEditing(!isEditing);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProfile((prevProfile) => ({
			...prevProfile,
			[name]: value
		}));
	};

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh' marginTop='3em' padding={3}>
			<Box sx={{ width: '100%', maxWidth: 800, padding: 3, border: '1px solid #ccc', borderRadius: 2, textAlign: 'center' }}>
				{isEditing ? (
					<>
						<TextField
							label='Vardas'
							name='vardas'
							value={profile.vardas || ''}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
						<TextField
							label='Pavardė'
							name='pavarde'
							value={profile.pavarde || ''}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
						<TextField
							label='El. paštas'
							name='el_pastas'
							value={profile.el_pastas || ''}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
						<TextField
							label='Tel. numeris'
							name='telefono_numeris'
							value={profile.telefono_numeris || ''}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
						<TextField
							label='Slapyvardis'
							name='slapyvardis'
							value={profile.slapyvardis || ''}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
						<TextField
							label='Facebook nuoroda'
							name='facebook_nuoroda'
							value={profile.facebook_nuoroda || ''}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
						<TextField
							label='Instagram nuoroda'
							name='instagram_nuoroda'
							value={profile.instagram_nuoroda || ''}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
						<TextField
							label='Twitter nuoroda'
							name='twitter_nuoroda'
							value={profile.twitter_nuoroda || ''}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
						<TextField
							label='Aprašymas'
							name='aprasymas'
							value={profile.aprasymas || ''}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateField
								label="Gimimo data"
								name='gimimo_data'
								value={profile.gimimo_data ? dayjs(profile.gimimo_data) : null}
								onChange={(newValue) => handleChange({ target: { name: 'gimimo_data', value: newValue ? newValue.toISOString() : null } })}
								fullWidth
								margin='normal'
							/>
						</LocalizationProvider>
						<TextField
							label='Lytis'
							name='lytis'
							value={profile.lytis || ''}
							onChange={handleChange}
							fullWidth
							margin='normal'
						/>
					</>
				) : (
					<>
						{profile.profilio_nuotrauka && (
							<Box
								component="img"
								src={profile.profilio_nuotrauka}
								alt="Profilio nuotrauka"
								sx={{
									width: 150,
									height: 150,
									borderRadius: '50%',
									objectFit: 'cover',
									marginBottom: 2,
								}}
							/>
						)}
						{((profile.vardas && profile.pavarde) ? <Typography variant='h5'>Vardas: {profile.vardas + " " + profile.pavarde}</Typography> : <></>) }
						{(profile.el_pastas ? <Typography variant='h5'>El. paštas: {profile.el_pastas}</Typography> : <></>) }
						{(profile.telefono_numeris ? <Typography variant='h5'>Tel. numeris: {profile.telefono_numeris}</Typography> : <></>) }
						{(profile.slapyvardis ? <Typography variant='h5'>Slapyvardis: {profile.slapyvardis}</Typography> : <></>) }
						{(profile.facebook_nuoroda  ? <a style={{padding:"1em"}} href={profile.facebook_nuoroda}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg></a> : <></>) }
						{(profile.instagram_nuoroda ? <a style={{padding:"1em"}} href={profile.instagram_nuoroda}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M15.233 5.488c-.843-.038-1.097-.046-3.233-.046s-2.389.008-3.232.046c-2.17.099-3.181 1.127-3.279 3.279-.039.844-.048 1.097-.048 3.233s.009 2.389.047 3.233c.099 2.148 1.106 3.18 3.279 3.279.843.038 1.097.047 3.233.047 2.137 0 2.39-.008 3.233-.046 2.17-.099 3.18-1.129 3.279-3.279.038-.844.046-1.097.046-3.233s-.008-2.389-.046-3.232c-.099-2.153-1.111-3.182-3.279-3.281zm-3.233 10.62c-2.269 0-4.108-1.839-4.108-4.108 0-2.269 1.84-4.108 4.108-4.108s4.108 1.839 4.108 4.108c0 2.269-1.839 4.108-4.108 4.108zm4.271-7.418c-.53 0-.96-.43-.96-.96s.43-.96.96-.96.96.43.96.96-.43.96-.96.96zm-1.604 3.31c0 1.473-1.194 2.667-2.667 2.667s-2.667-1.194-2.667-2.667c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667zm4.333-12h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm.952 15.298c-.132 2.909-1.751 4.521-4.653 4.654-.854.039-1.126.048-3.299.048s-2.444-.009-3.298-.048c-2.908-.133-4.52-1.748-4.654-4.654-.039-.853-.048-1.125-.048-3.298 0-2.172.009-2.445.048-3.298.134-2.908 1.748-4.521 4.654-4.653.854-.04 1.125-.049 3.298-.049s2.445.009 3.299.048c2.908.133 4.523 1.751 4.653 4.653.039.854.048 1.127.048 3.299 0 2.173-.009 2.445-.048 3.298z"/></svg></a> : <></>) }
						{(profile.twitter_nuoroda ? <a style={{padding:"1em"}} href={profile.twitter_nuoroda} target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a> : <></>) }
						{(profile.aprasymas ? <Typography variant='h5'>Aprašymas: {profile.aprasymas}</Typography> : <></>) }
						{(profile.registracijos_data ? <Typography variant='h5'>Registracijos data: {profile.registracijos_data}</Typography> : <></>) }
						{(profile.gimimo_data ? <Typography variant='h5'>Gimimo data: {dayjs(profile.gimimo_data).format('YYYY-MM-DD')}</Typography> : <></>) }
						{(profile.lytis ? <Typography variant='h5'>Lytis: {profile.lytis}</Typography> : <></>) }
					</>
				)}
			</Box>
			{currentUserId === String(userId) ? <Button style={{marginBottom:'3em'}} variant='contained' color='primary' onClick={handleEditClick} sx={{ marginTop: 2 }}>
				{isEditing ? 'Išsaugoti' : 'Pakeisti'}
			</Button> : <></>}
		</Box>
	);
}

export default UserProfile;
