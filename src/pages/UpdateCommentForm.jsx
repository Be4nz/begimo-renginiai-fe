import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getComment, updateComment } from '../api/commentAPI';

function UpdateCommentForm() {
    const navigate = useNavigate();
    const { id: commentId } = useParams(); // Fetch comment ID from the URL
    const [comment, setComment] = useState('');
    const [renginioId, setRenginioId] = useState(null);
    const user = localStorage.getItem('user'); // Parse user data from localStorage

    useEffect(() => {
        const loadCommentDetails = async () => {
            try {
                const fetchedComment = await getComment(commentId);
                console.log(fetchedComment[0].naudotojo_id); // Fetch comment by ID
                if (fetchedComment[0].naudotojo_id != user) {
                    console.log("HAHAHAHAHA pagautas");
                    navigate('/login'); // Redirect to login if user doesn't match
                    return;
                }
                setComment(fetchedComment[0].tekstas);
                setRenginioId(fetchedComment[0].renginio_id);
            } catch (error) {
                console.error('Error fetching comment details:', error);
                navigate('/login'); // Redirect to login if there’s an error (e.g., unauthorized access)
            }
        };

        loadCommentDetails();
    }, [commentId, user, navigate]);

    const handleCardClick = () => {
        if (renginioId) {
            navigate(`/run/${renginioId}/comments`); // Redirect back to event's comments
        }
    };

    const handleUpdateComment = async (e) => {
        e.preventDefault();
        try {
            await updateComment(commentId, { tekstas: comment,
                data: new Date().toISOString().split('T')[0], // Today's date
                renginio_id: renginioId, 
                naudotojo_id: user
             }); // Update the comment
            handleCardClick(); // Navigate back to comments after updating
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" padding={3}>
            <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
                <CardActionArea onClick={handleCardClick}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Atgal į komentarus
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Typography variant="h4" component="h1" gutterBottom>
                Atnaujinti komentarą
            </Typography>

            <form onSubmit={handleUpdateComment}>
                <TextField
                    label="Komentaras"
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Pakeisti komentarą
                </Button>
            </form>
        </Box>
    );
}

export default UpdateCommentForm;
