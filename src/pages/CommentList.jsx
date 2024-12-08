import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CommentDeleteConfirm from '../components/modal/CommentDeleteConfirm';
import { fetchAllComments } from '../api/commentAPI';
import { deleteComment } from '../api/commentAPI';

function CommentList() {
    const navigate = useNavigate();
    const { id: runId } = useParams();
    const [comments, setComments] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    // Fetch user from local storage
    const user = localStorage.getItem('user');

    // Fetch comments on mount
    useEffect(() => {
        const loadComments = async () => {
            try {
                const comments = await fetchAllComments(runId);
                setComments(comments);
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };

        loadComments();
    }, [runId]);

    const handleCardClick = () => {
        navigate(`/run/${runId}`);
    };

    const handleUpdateCommentClick = (id) => {
        navigate(`/update-comment/${id}`);
    };

    const handleDeleteComment = (id) => {
        setCommentToDelete(id);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCommentToDelete(null);
    };

    const handleConfirmDelete = async () => {
        try {
            if (commentToDelete) {
                await deleteComment(commentToDelete);
                setComments((prevComments) => prevComments.filter((c) => c.id !== commentToDelete));
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        } finally {
            setModalOpen(false);
            setCommentToDelete(null);
        }
    };
	
	console.log(user);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={3}>
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    fontWeight: 'bold',
                    marginBottom: 3,
                    letterSpacing: 2,
                }}
            >
                Komentarai
            </Typography>

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
                            Atgal į bėgimą
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            {comments.map((comment) => {
				console.log(comment.naudotojo_id); // Print comment.naudotojo_id(
				return (
                <Card key={comment.id} sx={{ maxWidth: 500, marginBottom: 2, padding: 2, boxShadow: 2 }}>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        {comment.tekstas}
                    </Typography>
                    {user == comment.naudotojo_id && (
                        <Box display="flex" justifyContent="space-between">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => handleUpdateCommentClick(comment.id)}
                            >
                                Atnaujinti
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleDeleteComment(comment.id)}
                            >
                                Pašalinti
                            </Button>
                        </Box>
                    )}
                </Card>
            )})}

            <CommentDeleteConfirm
                open={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
}

export default CommentList;
