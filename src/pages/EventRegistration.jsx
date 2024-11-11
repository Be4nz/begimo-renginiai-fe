import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function EventRegistration() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleCardClick = () => {
        navigate('/run/1');
    };

    const handleEventRegistrationUpdate = () => {
        navigate('/update-event-registration');
    };

    const handleCalendarClick = () => {
        navigate('/calendar');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage('Registration Successful!');
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
                Registruotis į bėgimo renginį
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
                            Atgal į bėgimo renginys
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '300px' }}>
                <TextField
                    label='Full Name'
                    variant='outlined'
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label='Email'
                    variant='outlined'
                    fullWidth
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant='contained' color='primary' type='submit' fullWidth>
                    Registruotis
                </Button>
            </form>

            {message && (
                <Typography variant='h6' sx={{ marginTop: 2, color: 'green', textAlign: 'center' }}>
                    {message}
                </Typography>
            )}

            <Button 
                variant='outlined' 
                color='secondary' 
                onClick={handleCalendarClick} 
                sx={{ marginTop: 3, width: '100%', maxWidth: '300px' }}
            >
                Peržiūrėti kalendorių
            </Button>

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
        </Box>
    );
}

export default EventRegistration;
