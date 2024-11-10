import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MakeCommentForm() {
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const handleCardClick = () => {
		navigate('/run/1');
	};
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("New Comment:", comment);
        navigate('/'); // Redirect to the main page or desired location after submission
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
