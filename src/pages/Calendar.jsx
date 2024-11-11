import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

function MyCalendar() {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());

    const handleEventRegistration = () => {
        navigate('/register-event');
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" padding={3}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                Select a Date
            </Typography>
            <Calendar onChange={setDate} value={date} />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
                Selected Date: {date.toDateString()}
            </Typography>
            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
                <CardActionArea onClick={handleEventRegistration}>
                    <CardContent>
                        <Typography
                            variant='h5'
                            component='div'
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Registruotis į bėgimo renginį
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}

export default MyCalendar;
