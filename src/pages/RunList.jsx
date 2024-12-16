import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, Grid, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchPublicEvents } from '../api/eventAPI';
import defaultImage from '../images/default.jpg';
import { checkUserCanCreateEvent } from '../api/userAPI';

function RunList() {
	const [events, setEvents] = useState([]);
	const [canCreateEvent, setCanCreateEvent] = useState(false);
	const navigate = useNavigate();


	useEffect(() => {
		const getEventsAndPermissions = async () => {
			try {
				const eventsData = await fetchPublicEvents();
				setEvents(eventsData);

				const user = JSON.parse(localStorage.getItem('user'));
				if (user) {
					const permission = await checkUserCanCreateEvent(user);
					setCanCreateEvent(permission);
				}
			} catch (error) {
				console.error('Error fetching public events or user permissions:', error);
			}
		};

		getEventsAndPermissions();
	}, []);

	const handleCardClickRun = (id) => {
        navigate(`/run/${id}`);
    };

	const handleCardClickCreate = () => {
		navigate('/create-run/1');
	};

	const handleCardClickInvite = () => {
		navigate('/invite-list');
	};
	
	const handleCardClickUser = () => {
		const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            navigate(`/user/${user}`);
        } else {
            alert('Naudotojas nerastas. Prašome prisijungti iš naujo.');
        }
	};

	const handleLogoutButtonClick = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('full_user');
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		navigate('/login');
	};
	
	const handleCardClickRegister = () => {
		navigate('/register');
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
				Pagrindinis langas
			</Typography>

			<Grid container spacing={3} justifyContent="center" marginBottom={2}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={5} key={event.id}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                boxShadow: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <CardActionArea onClick={() => handleCardClickRun(event.id)}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: 100,
                                        width: 100,
                                        objectFit: 'cover',
                                        margin: '16px auto',
                                        borderRadius: 2,
                                    }}
                                    image={event.nuotrauka || defaultImage}
                                    alt={event.pavadinimas}
                                />
                                <CardContent>
                                    <Typography
                                        variant='h5'
                                        component='div'
                                        sx={{
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {event.pavadinimas}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

			{/* <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2}}>
				<CardActionArea onClick={handleCardClickRegister}>
					<CardContent>
						<Typography
							variant='h5'
							component='div'
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Registracija
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card> */}

			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2}}>
				<CardActionArea onClick={handleLogoutButtonClick}>
					<CardContent>
						<Typography
							variant='h5'
							component='div'
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Atsijungti
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			{canCreateEvent && (
				<Card
					sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}
				>
					<CardActionArea onClick={handleCardClickCreate}>
						<CardContent>
							<Typography
								variant="h5"
								component="div"
								sx={{
									textAlign: 'center',
									fontWeight: 'bold',
								}}
							>
								Kurti bėgimą
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			)}
			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
				<CardActionArea onClick={handleCardClickUser}>
					<CardContent>
						<Typography
							variant='h5'
							component='div'
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Naudotojo profilis
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
				<CardActionArea onClick={handleCardClickInvite}>
					<CardContent>
						<Typography
							variant='h5'
							component='div'
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Peržiūrėti pakvietimus
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Box>
	);
}

export default RunList;
