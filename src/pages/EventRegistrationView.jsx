import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegistrationDeleteConfirm from '../components/modal/RegistrationDeleteConfirm';

function EventRegistrationView() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
	const [isModalOpen, setModalOpen] = useState(false);
    const handleCardClick = () => {
        navigate('/run/1');
    };

    const handleEventRegistrationUpdate = () => {
        navigate('/update-event-registration');
    };

    const handleEventRegistrationCreate = () => {
        navigate('/register-event');
    };
    
    const handleDeleteRegistration = () => {
        setModalOpen(true);
    };
	const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmDelete = () => {
        setModalOpen(false);
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
                Registracijų peržiūra
            </Typography>

            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 3 }}>
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
                            Atgal į bėgimo renginį
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>


            {message && (
                <Typography variant='h6' sx={{ marginTop: 2, color: 'green', textAlign: 'center' }}>
                    {message}
                </Typography>
            )}

            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginTop: 3 }}>
                <CardActionArea onClick={handleEventRegistrationUpdate}>
                    <CardContent>
                        <Typography
                            variant='h5'
                            component='div'
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Atnaujinti registraciją
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginTop: 3 }}>
                <CardActionArea onClick={handleEventRegistrationCreate}>
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
                <CardActionArea onClick={handleDeleteRegistration}>
                    <CardContent>
                        <Typography
                            variant='h5'
                            component='div'
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Pašalinti registraciją
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <RegistrationDeleteConfirm
                open={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
}

export default EventRegistrationView;
