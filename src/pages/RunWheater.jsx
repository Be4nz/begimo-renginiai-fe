import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RunWeather = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/run/1');
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            padding={3}
        >
            <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 'bold', marginBottom: 3, letterSpacing: 2 }}
            >
                Orų prognozė
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginBottom: 3 }}>
                Čia bus rodomi orų duomenys jūsų bėgimui.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleBackClick}
            >
                Atgal į bėgimą
            </Button>
        </Box>
    );
};

export default RunWeather;
