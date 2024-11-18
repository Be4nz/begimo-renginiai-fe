import React, { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InviteDeleteConfirm from '../components/modal/InviteDeleteConfirm';

function InviteList() {
	const navigate = useNavigate();
	const [isModalOpen, setModalOpen] = useState(false);

	const handleCardClick = () => {
		navigate('/sent-invite-list');
	};
	const handleDeleteInvite = () => {
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
			{/* Title */}
			<Typography
				variant='h3'
				component='h1'
				sx={{
					fontWeight: 'bold',
					marginBottom: 3,
					letterSpacing: 2,
				}}
			>
				Gauti pakvietimai
			</Typography>

			{/* Clickable Card */}
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
							Peržiūrėti išsiųstus pakietimus
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
                <CardActionArea onClick={handleDeleteInvite}>
                    <CardContent>
                        <Typography
                            variant='h5'
                            component='div'
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Pašalinti pakvietimą
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
			<InviteDeleteConfirm
                open={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
		</Box>
	);
}

export default InviteList;
