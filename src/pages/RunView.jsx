import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RunDeleteConfirm from '../components/modal/RunDeleteConfirm';

function RunView() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleCardClick = () => {
        navigate('/run/1/comments');
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
        navigate('/edit-run/1');
    };

    const handleDeleteRun = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmDelete = () => {
        setModalOpen(false);
		navigate('/run-list');
    };

	const handleWeatherClick = () => {
		navigate('/run/1/weather');
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
                Bėgimas
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
                            Redaguoti bėgimą
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
                            Pašalinti bėgimą
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
            
			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2  }}>
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
