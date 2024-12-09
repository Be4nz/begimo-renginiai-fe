import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEventById, editEventById, fetchCities } from '../api/eventAPI';

const cityCoordinates = {
    1: "54.8985,23.9036", // Kaunas
    2: "54.6872,25.2797", // Vilnius
    3: "55.7033,21.1443", // Klaipėda
    4: "55.9333,23.3167", // Šiauliai
    5: "55.7333,24.35",   // Panevėžys
    6: "54.4,24.05",      // Alytus
    7: "54.5599,23.3498", // Marijampolė
    8: "55.5,25.6",       // Utena
    9: "55.9833,22.25",   // Telšiai
    10: "55.25,22.2897",  // Tauragė
};

const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
};

const EditRun = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pavadinimas: '',
        aprasymas: '',
        data: '',
        pradzios_laikas: '',
        pabaigos_laikas: '',
        internetinio_puslapio_nuoroda: '',
        facebook_nuoroda: '',
        adresas: '',
        privatus: false,
        nuotrauka: '',
        koordinate: '',
        miestas_id: '',
    });

    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEventAndCities = async () => {
            try {
                const [eventData, cityList] = await Promise.all([
                    fetchEventById(id),
                    fetchCities(),
                ]);

                setFormData({
                    pavadinimas: eventData.pavadinimas || '',
                    aprasymas: eventData.aprasymas || '',
                    data: formatDateForInput(eventData.data),
                    pradzios_laikas: eventData.pradzios_laikas || '',
                    pabaigos_laikas: eventData.pabaigos_laikas || '',
                    internetinio_puslapio_nuoroda: eventData.internetinio_puslapio_nuoroda || '',
                    facebook_nuoroda: eventData.facebook_nuoroda || '',
                    adresas: eventData.adresas || '',
                    privatus: eventData.privatus || false,
                    nuotrauka: eventData.nuotrauka || '',
                    koordinate: eventData.koordinate || '',
                    miestas_id: eventData.miestas_id || '',
                });

                setCities(cityList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event or cities:', error);
                alert('Nepavyko gauti renginio arba miestų duomenų.');
                navigate(`/run/${id}`);
            }
        };

        loadEventAndCities();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => {
            if (name === 'miestas_id') {
                const coordinates = cityCoordinates[value] || prevData.koordinate;
                return {
                    ...prevData,
                    [name]: value,
                    koordinate: coordinates,
                };
            }

            return {
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            };
        });
    };

    const handleCancel = () => {
        navigate(`/run/${id}`);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.miestas_id) {
            alert('Prašome pasirinkti miestą.');
            return;
        }
        try {
            const response = await editEventById(id, formData);
            console.log('Event updated:', response);
            alert('Bėgimas atnaujintas sėkmingai!');
            navigate(`/run/${id}`);
        } catch (error) {
            alert('Klaida atnaujinant bėgimą.');
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={3}
        >
            <Card sx={{ maxWidth: 500, padding: 4, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        Redaguoti renginį
                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Bėgimo pavadinimas"
                                variant="outlined"
                                name="pavadinimas"
                                value={formData.pavadinimas}
                                onChange={handleInputChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Aprašymas"
                                variant="outlined"
                                name="aprasymas"
                                value={formData.aprasymas}
                                onChange={handleInputChange}
                                multiline
                                rows={3}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Data"
                                variant="outlined"
                                name="data"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formData.data}
                                onChange={handleInputChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Pradžios laikas"
                                variant="outlined"
                                name="pradzios_laikas"
                                type="time"
                                InputLabelProps={{ shrink: true }}
                                value={formData.pradzios_laikas}
                                onChange={handleInputChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Pabaigos laikas"
                                variant="outlined"
                                name="pabaigos_laikas"
                                type="time"
                                InputLabelProps={{ shrink: true }}
                                value={formData.pabaigos_laikas}
                                onChange={handleInputChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel id="miestas-label">Pasirinkite miestą</InputLabel>
                                <Select
                                    labelId="miestas-label"
                                    name="miestas_id"
                                    value={formData.miestas_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {cities.map((city) => (
                                        <MenuItem key={city.id} value={city.id}>
                                            {city.pavadinimas}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Adresas"
                                variant="outlined"
                                name="adresas"
                                value={formData.adresas}
                                onChange={handleInputChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Internetinio puslapio nuoroda"
                                variant="outlined"
                                name="internetinio_puslapio_nuoroda"
                                type="url"
                                value={formData.internetinio_puslapio_nuoroda}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Facebook nuoroda"
                                variant="outlined"
                                name="facebook_nuoroda"
                                type="url"
                                value={formData.facebook_nuoroda}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Nuotrauka (URL)"
                                variant="outlined"
                                name="nuotrauka"
                                type="url"
                                value={formData.nuotrauka}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="privatus"
                                        checked={formData.privatus}
                                        onChange={handleInputChange}
                                    />
                                }
                                label="Privatus"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ padding: 1 }}
                            >
                                Išsaugoti pakeitimus
                            </Button>
                            <Button
                                type="button"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                sx={{ padding: 1 }}
                                onClick={handleCancel}
                            >
                                Atšaukti
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EditRun;
