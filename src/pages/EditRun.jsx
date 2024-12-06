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
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEventById, editEventById } from '../api/eventAPI';

const EditRun = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        distance: '',
        location: '',
        website: '',
        facebookLink: '',
        address: '',
        private: false,
        photo: '',
        coordinate: '',
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const event = await fetchEventById(id);
                setFormData({
                    name: event.pavadinimas || '',
                    description: event.aprasymas || '',
                    date: event.data || '',
                    startTime: event.pradzios_laikas || '',
                    endTime: event.pabaigos_laikas || '',
                    distance: event.atstumas || '',
                    location: event.vieta || '',
                    website: event.internetinio_puslapio_nuoroda || '',
                    facebookLink: event.facebook_nuoroda || '',
                    address: event.adresas || '',
                    private: event.privatus || false,
                    photo: event.nuotrauka || '',
                    coordinate: event.koordinate || '',
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event:', error);
                alert('Nepavyko gauti renginio duomenų.');
                navigate('/run-list');
            }
        };

        fetchEvent();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await editEventById(id, formData);
            alert('Renginys sėkmingai atnaujintas.');
            navigate(`/run/${id}`);
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Įvyko klaida atnaujinant renginį.');
        }
    };

    const handleCancel = () => {
        navigate(`/run/${id}`);
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={3}>
            <Card sx={{ maxWidth: 500, width: '100%', padding: 4, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        Redaguoti bėgimą
                    </Typography>
                    <form onSubmit={handleEdit}>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Bėgimo pavadinimas"
                                variant="outlined"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Aprašymas"
                                variant="outlined"
                                name="description"
                                value={formData.description}
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
                                name="date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Pradžios laikas"
                                variant="outlined"
                                name="startTime"
                                type="time"
                                InputLabelProps={{ shrink: true }}
                                value={formData.startTime}
                                onChange={handleInputChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Pabaigos laikas"
                                variant="outlined"
                                name="endTime"
                                type="time"
                                InputLabelProps={{ shrink: true }}
                                value={formData.endTime}
                                onChange={handleInputChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Atstumas (km)"
                                variant="outlined"
                                name="distance"
                                type="number"
                                value={formData.distance}
                                onChange={handleInputChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Vieta"
                                variant="outlined"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Internetinio puslapio nuoroda"
                                variant="outlined"
                                name="website"
                                type="url"
                                value={formData.website}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Facebook nuoroda"
                                variant="outlined"
                                name="facebookLink"
                                type="url"
                                value={formData.facebookLink}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Adresas"
                                variant="outlined"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="private"
                                        checked={formData.private}
                                        onChange={handleInputChange}
                                    />
                                }
                                label="Privatus"
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Nuotrauka (URL)"
                                variant="outlined"
                                name="photo"
                                type="url"
                                value={formData.photo}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Koordinatė"
                                variant="outlined"
                                name="coordinate"
                                type="text"
                                value={formData.coordinate}
                                onChange={handleInputChange}
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
