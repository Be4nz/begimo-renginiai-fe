import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateRun = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/run-list');
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
            <Card sx={{ maxWidth: 500, padding: 4, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        Sukurti naują bėgimą
                    </Typography>
                    <form>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Bėgimo pavadinimas"
                                variant="outlined"
                                name="name"
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
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Vieta"
                                variant="outlined"
                                name="location"
                                required
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
