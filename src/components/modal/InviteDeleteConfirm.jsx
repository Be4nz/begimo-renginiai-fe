import React from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';

const InviteDeleteConfirm = ({ open, onClose, onConfirm }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}
            >
                <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                    Ar tikrai norite pašalinti pakvietimą?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="error" onClick={onConfirm}>
                        Patvirtinti
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onClose}>
                        Atšaukti
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default InviteDeleteConfirm;
