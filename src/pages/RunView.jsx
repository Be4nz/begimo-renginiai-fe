import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import RunDeleteConfirm from '../components/modal/RunDeleteConfirm';
import { deleteEventById } from '../api/eventAPI';

function RunView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleCardClick = () => {
        navigate(`/run/${id}/comments`);
    };

    const handleInviteClick = () => {
        navigate('/invite-form');
    };

    const handleEventRegistration = () => {
        navigate('/register-event-view');
    };

    const handleEventRegistrationUpdate = () => {
        navigate('/update-event-registration');
    };

    const handleEditRun = () => {
        navigate(`/edit-run/${id}`);
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
        navigate('/make-comment');
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
                Renginys: {id}
            </Typography>

            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
                <CardActionArea onClick={handleCardClick}>
                    <CardContent>
                        <Typography
                            variant='h5'
                            component='div'
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

            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
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

            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
                <CardActionArea onClick={handleEditRun}>
                    <CardContent>
                        <Typography
                            variant='h5'
                            component='div'
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

            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
                <CardActionArea onClick={handleDeleteRun}>
                    <CardContent>
                        <Typography
                            variant='h5'
                            component='div'
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
                            Registruotis į renginį
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
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

            <RunDeleteConfirm
                open={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
}

export default RunView;
