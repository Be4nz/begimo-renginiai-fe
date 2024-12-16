import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEventById } from '../api/eventAPI';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';


const containerStyle = {
    width: '400px',
    height: '400px',
};

const RunMap = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBrEAY-m9MCNyidH79DIjcgYRqQBYYn6HQ', // Replace with your API key
    });

    const [map, setMap] = useState(null);

    const onLoad = (map) => {
        setMap(map);
    };

    const onUnmount = () => {
        setMap(null);
    };

    useEffect(() => {
        const loadEventWithMap = async () => {
            try {
                const data = await fetchEventById(id);
                const [latitude, longitude] = data.koordinate
                    .split(',')
                    .map(coord => parseFloat(coord.trim()));

                if (isNaN(latitude) || isNaN(longitude)) {
                    throw new Error('Invalid coordinates format.');
                }

                setEvent({
                    ...data,
                    latitude,
                    longitude,
                });
                setLoading(false);
            } catch (err) {
                console.error('Error loading event or map:', err);
                setError('Nepavyko gauti renginio duomenų arba parodyti žemėlapio.');
                setLoading(false);
            }
        };

        loadEventWithMap();
    }, [id]);

    const handleBackClick = () => {
        navigate(`/run/${id}`);
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
                Renginio žemėlapis
            </Typography>
            {loading ? (
                <Typography variant="body1" component="p" sx={{ marginBottom: 3 }}>
                    Kraunama renginio informacija ir žemėlapis...
                </Typography>
            ) : error ? (
                <Typography variant="body1" component="p" sx={{ color: 'red', marginBottom: 3 }}>
                    {error}
                </Typography>
            ) : event ? (
                <Box>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        <strong>Renginio informacija:</strong>
                    </Typography>
                    <Typography><strong>Pavadinimas:</strong> {event.pavadinimas}</Typography>
                    <Typography><strong>Data:</strong> {new Date(event.data).toLocaleDateString('lt-LT')}</Typography>
                    <Typography><strong>Pradžios laikas:</strong> {event.pradzios_laikas}</Typography>
                    <Typography><strong>Koordinatės:</strong> {event.latitude}, {event.longitude}</Typography>

                    {isLoaded && (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={{ lat: event.latitude, lng: event.longitude }}
                            zoom={10}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            <MarkerF position={{ lat: event.latitude, lng: event.longitude }}></MarkerF>
                        
                            </GoogleMap>
                    )}
                </Box>
            ) : null}
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

export default RunMap;
