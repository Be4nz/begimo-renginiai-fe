import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEventWeather } from '../api/eventAPI';

const RunWeather = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [weather, setWeather] = useState(null);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWeather = async () => {
            try {
                const data = await fetchEventWeather(id);
                setWeather(data.weather);
                setEvent(data.event);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                alert('Nepavyko gauti orų duomenų.');
                setLoading(false);
            }
        };

        loadWeather();
    }, [id]);

    const handleBackClick = () => {
        navigate(`/run/${id}`);
    };

    const isMatchingTime = (forecastTime) => {
        const forecastHour = new Date(forecastTime).getHours();
        const eventHour = new Date(`1970-01-01T${event.pradzios_laikas}`).getHours();
        return forecastHour === eventHour;
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={3}
        >
            <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 'bold', marginBottom: 3, letterSpacing: 2 }}
            >
                Orų prognozė
            </Typography>
            {loading ? (
                <Typography variant="body1" component="p" sx={{ marginBottom: 3 }}>
                    Kraunama orų prognozė...
                </Typography>
            ) : weather && event ? (
                <Box>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        <strong>Renginio informacija:</strong>
                    </Typography>
                    <Typography><strong>Pavadinimas:</strong> {event.pavadinimas}</Typography>
                    <Typography><strong>Data:</strong> {new Date(event.data).toLocaleDateString('lt-LT')}</Typography>
                    <Typography><strong>Pradžios laikas:</strong> {event.pradzios_laikas}</Typography>
                    <Typography><strong>Koordinatės:</strong> {event.koordinate}</Typography>

                    <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 2 }}>
                        <strong>Valandinė prognozė:</strong>
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Laikas</strong></TableCell>
                                    <TableCell><strong>Temperatūra (°C)</strong></TableCell>
                                    <TableCell><strong>Krituliai (mm)</strong></TableCell>
                                    <TableCell><strong>Vėjo greitis (km/h)</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {weather.hourly.time.map((time, index) => (
                                    <TableRow
                                        key={time}
                                        sx={{
                                            backgroundColor: isMatchingTime(time) ? 'yellow' : 'inherit',
                                            animation: isMatchingTime(time)
                                                ? 'glow 1.5s ease-in-out infinite'
                                                : 'none',
                                        }}
                                    >
                                        <TableCell>
                                            {new Date(time).toLocaleTimeString('lt-LT', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </TableCell>
                                        <TableCell>{weather.hourly.temperature_2m[index]}</TableCell>
                                        <TableCell>{weather.hourly.precipitation[index]}</TableCell>
                                        <TableCell>{weather.hourly.wind_speed_10m[index]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ) : (
                <Typography variant="body1" component="p" sx={{ marginBottom: 3 }}>
                    Nepavyko gauti orų prognozės.
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleBackClick}
                sx={{ marginTop: 3 }}
            >
                Atgal į bėgimą
            </Button>
        </Box>
    );
};

export default RunWeather;
