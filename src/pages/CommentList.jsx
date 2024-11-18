import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CommentDeleteConfirm from '../components/modal/CommentDeleteConfirm';

function CommentList() {
	const navigate = useNavigate();
	const [isModalOpen, setModalOpen] = useState(false);

	const handleCardClick = () => {
		navigate('/run/1');
	};
	const handleUpdateCommentClick = () => {
        navigate('/update-comment');
    };
	
    const handleDeleteComment = () => {
        setModalOpen(true);
    };
	const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmDelete = () => {
        setModalOpen(false);
    };

	return (
		<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh' padding={3}>
			<Typography
				variant='h3'
				component='h1'
				sx={{
					fontWeight: 'bold',
					marginBottom: 3,
					letterSpacing: 2,
				}}
			>
				Komentarai
			</Typography>

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
			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
				<CardActionArea onClick={handleUpdateCommentClick}>
					<CardContent>
						<Typography
							variant='h5'
							component='div'
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Atnaujinti komentarą
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
                <CardActionArea onClick={handleDeleteComment}>
                    <CardContent>
                        <Typography
                            variant='h5'
                            component='div'
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Pašalinti komentarą
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
			<CommentDeleteConfirm
                open={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
		</Box>
	);
}

export default CommentList;
