import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import RegistrationDeleteConfirm from '../components/modal/RegistrationDeleteConfirm';
import { getRegistrations, deleteRegistration } from '../api/registrationAPI';

function EventRegistrationView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState([]);
    const [message, setMessage] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);
    const userId = localStorage.getItem('user');
   

    useEffect(() => {
        // Fetch registrations when the component mounts
        const fetchRegistrations = async () => {
            try {
                const response = await getRegistrations(id);
                setRegistrations(response);
            } catch (error) {
                console.error('Error fetching registrations:', error);
                setMessage('Failed to load registrations');
            }
        };
        fetchRegistrations();
    }, [id]);

    const handleCardClick = () => {
        navigate(`/run/${id}`);
    };

    const handleEventRegistrationUpdate = () => {
        navigate(`/update-event-registration/${id}`);
    };

    const handleEventRegistrationCreate = () => {
        navigate(`/register-event/${id}`);
    };

    const handleDeleteRegistration = (registrationId) => {
        setSelectedRegistrationId(registrationId); // Set the ID of the registration to delete
        setModalOpen(true); // Open the confirmation modal
    };
    

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const userRegistrations = registrations.filter(registration => registration.userId === userId);
    const handleConfirmDelete = async () => {
        try {
            if (selectedRegistrationId) {
                await deleteRegistration(selectedRegistrationId, userId); // Ensure the userId is passed correctly
                setMessage('Registration deleted successfully');
                setModalOpen(false);
    
                // Refresh the registrations list
                const response = await getRegistrations(id);
                setRegistrations(response);
            }
        } catch (error) {
            console.error('Error deleting registration:', error);
            setMessage('Failed to delete registration');
        }
    };
    
    

    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='flex-start' minHeight='150vh' padding={3} overflowY='auto'>
            <Typography variant='h3' component='h1' sx={{ fontWeight: 'bold', marginBottom: 3, letterSpacing: 2 }}>
                Registracijos peržiūra
            </Typography>

        

            {registrations.length > 0 ? (
                <Box sx={{ marginBottom: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                        Registracijos:
                    </Typography>
                    {registrations.map((registration) => (
                        <Card key={registration.id} sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                        {registration.vardas} ({registration.el_pastas})
                                    </Typography>
                                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                        Registracijos data: {new Date(registration.registracijos_data).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            ) : (
                <Typography variant="h6" sx={{ color: 'gray', marginBottom: 3 }}>
                    No registrations yet.
                </Typography>
            )}

            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 3 }}>
                <CardActionArea onClick={handleCardClick}>
                    <CardContent>
                        <Typography variant='h5' component='div' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Atgal į bėgimo renginį
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>


            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginTop: 3 }}>
                <CardActionArea onClick={handleEventRegistrationCreate}>
                    <CardContent>
                        <Typography variant='h5' component='div' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Registruotis į renginį
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginTop: 3 }}>
                <CardActionArea onClick={handleEventRegistrationUpdate}>
                    <CardContent>
                        <Typography variant='h5' component='div' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Atnaujinti registraciją
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            {userRegistrations.map((registration) => (
    <Card key={registration.id} sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
        <CardActionArea>
            <CardContent>
                <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {registration.vardas} ({registration.el_pastas})
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    Registracijos data: {new Date(registration.registracijos_data).toLocaleString()}
                </Typography>
                <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDeleteRegistration(registration.id)} 
                    sx={{ marginTop: 2 }}
                >
                    Pašalinti registraciją
                </Button>
            </CardContent>
        </CardActionArea>
    </Card>
))}



            {/* Confirmation Modal */}
            <RegistrationDeleteConfirm
                open={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
}

export default EventRegistrationView;
