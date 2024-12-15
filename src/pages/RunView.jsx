import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import RunDeleteConfirm from '../components/modal/RunDeleteConfirm';
import { fetchEventById, deleteEventById } from '../api/eventAPI';
import { checkUserIsAdmin } from '../api/userAPI';


function RunView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isModalOpen, setModalOpen] = useState(false);
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const { id: runId } = useParams();


    const currentUserId = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const loadEventDetails = async () => {
            try {
                const event = await fetchEventById(id);
                console.log('Event details fetched:', event);
                setEventDetails(event);

                if (currentUserId) {
                    const adminStatus = await checkUserIsAdmin(currentUserId);
                    setIsAdmin(adminStatus);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching event details:', error);
                alert('Nepavyko gauti renginio informacijos.');
                navigate('/run-list');
            }
        };

        loadEventDetails();
    }, [id, currentUserId, navigate]);

    const handleCardClick = () => {
        navigate(`/run/${runId}/comments`);
    };

    const handleEventRegistration = () => {
        navigate(`/register-event/${id}`);
    };

    const handleEventRegistrationUpdate = () => {
        navigate(`/update-event-registration/${id}`);
    };

    const handleInviteClick = () => {
		navigate(`/invite-form/${id}`);
	};

    const handleEditRun = () => {
        navigate(`/edit-run/${id}`);
    };

    const handleBack = () => {
        navigate(`/run-list`);
    };

	const handleDeleteRun = () => {
		setModalOpen(true);
	};

    const handleCloseModal = () => {
		setModalOpen(false);
	};

    const handleConfirmDelete = async () => {
        if (id) {
            try {
                await deleteEventById(id);
                setModalOpen(false);
                alert('Renginys sėkmingai ištrintas');
                navigate('/run-list');
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Įvyko klaida bandant ištrinti renginį');
            }
        }
    };

    const handleWeatherClick = () => {
        navigate(`/run/${id}/weather`);
    };

    const handleMakeCommentClick = () => {
        navigate(`/make-comment/${runId}`);
    };
    const handleMapClick = () => {
        navigate(`/run/${id}/map`);
    };
    if (loading) {
        return <Typography variant="h5">Kraunama...</Typography>;
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={3}>
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    fontWeight: 'bold',
                    marginBottom: 3,
                    letterSpacing: 2,
                }}
            >
                Renginys: {eventDetails.pavadinimas}
            </Typography>

            <Box sx={{ maxWidth: 500, marginBottom: 3, boxShadow: 3, padding: 3, borderRadius: 2 }}>
                <Typography variant="h6"><strong>Aprašymas:</strong> {eventDetails.aprasymas}</Typography>
                <Typography variant="h6"><strong>Data:</strong> {new Date(eventDetails.data).toLocaleDateString()}</Typography>
                <Typography variant="h6"><strong>Pradžios laikas:</strong> {eventDetails.pradzios_laikas}</Typography>
                <Typography variant="h6"><strong>Pabaigos laikas:</strong> {eventDetails.pabaigos_laikas}</Typography>
                <Typography variant="h6"><strong>Adresas:</strong> {eventDetails.adresas}</Typography>
                <Typography variant="h6"><strong>Koordinatės:</strong> {eventDetails.koordinate}</Typography>
                <Typography variant="h6"><strong>Miestas:</strong> {eventDetails.miestas_pavadinimas}</Typography>
                <Typography variant="h6"><strong>Distancija:</strong> {eventDetails.distancija_pavadinimas} ({eventDetails.distancija_atstumas} km)</Typography>
                <Typography variant="h6">
                    <strong>Organizatorius ID:</strong> {eventDetails.organizatorius_id}
                </Typography>
            </Box>


            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
                <CardActionArea onClick={handleCardClick}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Komentarai
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
                <CardActionArea onClick={handleMapClick}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ textAlign: 'center', fontWeight: 'bold' }}
                        >
                            Žemėlapio peržiūra
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
                <CardActionArea onClick={handleInviteClick}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Siųsti pakvietimą
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            {currentUserId === eventDetails.organizatorius_id && (
                <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
                    <CardActionArea onClick={handleEditRun}>
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                Redaguoti renginį
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )}

            {isAdmin && (
                <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
                    <CardActionArea onClick={handleDeleteRun}>
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                Pašalinti renginį
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )}

            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
                <CardActionArea onClick={handleWeatherClick}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ textAlign: 'center', fontWeight: 'bold' }}
                        >
                            Orų prognozė
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
				<CardActionArea onClick={handleInviteClick}>
					<CardContent>
						<Typography
							variant='h5'
							component='div'
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Siųsti pakvietimą
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
				<CardActionArea onClick={handleMakeCommentClick}>
					<CardContent>
						<Typography
							variant='h5'
							component='div'
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Kurti komentarą
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
				<CardActionArea onClick={handleEventRegistration}>
					<CardContent>
						<Typography
							variant='h5'
							component='div'
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Registruotis į bėgimo renginį
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>

			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
				<CardActionArea onClick={handleWeatherClick}>
					<CardContent>
						<Typography variant='h5' component='div' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
							Orų prognozė
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>

            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
				<CardActionArea onClick={handleBack}>
					<CardContent>
						<Typography variant='h5' component='div' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
							Atgal į pagrindinį puslapį
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>

			<RunDeleteConfirm open={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
		</Box>
	);
}

export default RunView;
