import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createComment } from '../api/commentAPI';
import { useParams } from 'react-router-dom';

function MakeCommentForm() {
    const navigate = useNavigate();
    const { id: runId } = useParams();
    const [comment, setComment] = useState('');
    const user = localStorage.getItem('user');
    const handleCardClick = () => {
		navigate(`/run/${runId}`);
	};
    const handleSubmit  = async (e) => {
		e.preventDefault();
        if (!comment) {
            alert('Prašome įvesti komentarą.');
            return;
        }
        try {
            const commentData = {
				tekstas: comment,
				data: new Date().toISOString().split('T')[0], // Today's date
				// Hardcoded recipient ID (replace with dynamic ID based on email lookup)
				renginio_id: runId, 
                autoriaus_id: user, // Hardcoded event ID (replace with dynamic selection if available)
			};
            const response = await createComment(commentData);
            console.log('Event created:', response);
            alert('Komentaras sukurtas sėkmingai!');
            navigate(`/run/${runId}/comments`);
        } catch (error) {
            alert('Klaida kuriant bėgimą.');
        }
        navigate(`/run/${runId}/comments`);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" padding={3}>
            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
				<CardActionArea onClick={handleCardClick}>
					<CardContent>
						<Typography
							variant='h5'
							component='div'
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Atgal į bėgimą
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
            <Typography variant="h4" component="h1" gutterBottom>
                Sukurti komentarą
            </Typography>
            
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Įveskite komentarą"
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Įrašyti komentarą
                </Button>
            </form>
        </Box>
        
    );
}

export default MakeCommentForm;
