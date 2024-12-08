import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UpdateEventRegistration() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleCardClick = () => {
        navigate('/register-event-view'); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Updated Full Name:", name);
        console.log("Updated Email:", email);
        setMessage('Registracija atnaujinta sėkmingai!');
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" padding={3}>
            
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
                <TextField
                    label="Vardas"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="El. paštas"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    type="email"
                    sx={{ marginBottom: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Pakeisti registraciją
                </Button>
            </form>

            
            {message && (
                <Typography variant="h6" sx={{ marginTop: 2, color: 'green', textAlign: 'center' }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
}

export default UpdateEventRegistration;
