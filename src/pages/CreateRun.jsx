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
import { useNavigate } from 'react-router-dom';
import { postEvent, fetchCities } from '../api/eventAPI';

const CreateRun = () => {
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
    const navigate = useNavigate();

    useEffect(() => {
        const loadCities = async () => {
            try {
                const cities = await fetchCities();
                setCities(cities);
            } catch (error) {
                console.error('Klaida gaunant miestus:', error);
                alert('Nepavyko gauti miestų sąrašo.');
            }
        };
        loadCities();
    }, []);

    const handleCancel = () => {
        navigate('/run-list');
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.miestas_id) {
            alert('Prašome pasirinkti miestą.');
            return;
        }
        try {
            const response = await postEvent(formData);
            console.log('Event created:', response);
            alert('Bėgimas sukurtas sėkmingai!');
            navigate('/run-list');
        } catch (error) {
            alert('Klaida kuriant bėgimą.');
        }
    };

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
                        Sukurti naują bėgimą
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
                            <TextField
                                fullWidth
                                label="Koordinatė"
                                variant="outlined"
                                name="koordinate"
                                value={formData.koordinate}
                                onChange={handleInputChange}
                                required
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
                                Sukurti bėgimą
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

export default CreateRun;
