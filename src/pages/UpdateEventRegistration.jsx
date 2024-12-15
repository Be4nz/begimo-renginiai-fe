import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { updateRegistration } from '../api/registrationAPI'; // Ensure this API function is implemented

function UpdateEventRegistration() {
    const { id } = useParams(); // Event ID
    const navigate = useNavigate();
    const [sendReminders, setSendReminders] = useState(false);
    const [message, setMessage] = useState('');

    const userId = localStorage.getItem('user'); // User ID stored in localStorage

    const handleCardClick = () => {
        navigate(`/register-event-view/${id}`);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!userId || !id) {
            setMessage('User ID or Event ID is missing.');
            return;
        }
    
        try {
            const response = await updateRegistration(parseInt(userId), parseInt(id), sendReminders);
    
            if (response.status === 200) {
                setMessage('Registracija sėkmingai atnaujinta!');
            } else if (response.status === 201) {
                setMessage('Nepavyko atnaujinti registracijos.');
            } else {
                setMessage('Nauja registracija sėkmingai sukurta!');
            }
        } catch (error) {
            console.error('Error updating registration:', error);
            setMessage('An error occurred while updating the registration.');
        }
    };
    

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" minHeight="150vh" padding={3}>
            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 3 }}>
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
                            Atgal į registracijos peržiūrą
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Typography variant="h4" component="h1" gutterBottom>
                Atnaujinti registraciją į renginį
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '300px' }}>
                
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={sendReminders}
                            onChange={(e) => setSendReminders(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Receive Reminders"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Pakeisti registraciją
                </Button>
            </form>

            {message && (
                <Typography variant="h6" sx={{ marginTop: 2, color: message.includes('successfully') ? 'green' : 'red', textAlign: 'center' }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
}

export default UpdateEventRegistration;
