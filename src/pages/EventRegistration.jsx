import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, Checkbox, FormControlLabel, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { registerUser, addEventToGoogleCalendar } from '../api/registrationAPI'; // Ensure this API function is correctly implemented

function EventRegistration() {
    const { id } = useParams(); // Event ID
    const navigate = useNavigate();
    const [sendReminders, setSendReminders] = useState(false);
    const [message, setMessage] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    const userId = localStorage.getItem('user'); // User ID stored in localStorage
    const userEmail = localStorage.getItem('userEmail'); // Assuming you also store the user's email in localStorage

    const handleCardClick = () => {
        navigate(`/register-event-view/${id}`);
    };

    const handleCalendarClick = () => {
        navigate('/calendar');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!userId || !id) {
            setMessage('User ID or Event ID is missing.');
            return;
        }

        try {
            const response = await registerUser(
                parseInt(userId), // Pass userId as an integer
                parseInt(id), // Pass eventId as an integer
                sendReminders // Boolean value for reminders
            );
await addEventToGoogleCalendar(parseInt(id), userEmail, sendReminders);

            setMessage('Registration Successful! Event added to your Google Calendar.');
        } catch (error) {
            console.error('Error registering user:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred while registering.';
            setMessage(errorMessage);
        }
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
                Registruotis į bėgimo renginį {id}
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
                            Atgal į registracijos peržiūrą
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '300px' }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={sendReminders}
                            onChange={(e) => setSendReminders(e.target.checked)}
                            color='primary'
                        />
                    }
                    label='Receive Reminders'
                />

                <Button variant='contained' color='primary' type='submit' fullWidth>
                    Registruotis
                </Button>
            </form>

            {message && (
                <Typography variant='h6' sx={{ marginTop: 2, color: message.includes('Successful') ? 'green' : 'red', textAlign: 'center' }}>
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
        </Box>
    );
}

export default EventRegistration;
