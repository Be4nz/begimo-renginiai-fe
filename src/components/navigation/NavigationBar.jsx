import React from 'react';
import { AppBar, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NavigationBar() {
	const navigate = useNavigate();

	const [showAll, setShowAll] = useState(false);

	return (
		<AppBar position='static'>
			<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
				<Button onClick={() => navigate('/run-list')} sx={{ my: 2, color: 'white', display: 'block' }}>
					Bėgimai
				</Button>
				{showAll && (
					<>
						<Button onClick={() => navigate('/invite-list')} sx={{ my: 2, color: 'white', display: 'block' }}>
							Pakvietimai
						</Button>
						<Button onClick={() => navigate('/invite/1')} sx={{ my: 2, color: 'white', display: 'block' }}>
							Pakvietimas
						</Button>
						<Button onClick={() => navigate('/run/1')} sx={{ my: 2, color: 'white', display: 'block' }}>
							Bėgimas
						</Button>
						<Button onClick={() => navigate('/run/1/comments')} sx={{ my: 2, color: 'white', display: 'block' }}>
							Bėgimo komentarai
						</Button>
						<Button onClick={() => navigate('/login')} sx={{ my: 2, color: 'white', display: 'block' }}>
							Prisijungimas
						</Button>
						<Button onClick={() => navigate('/register')} sx={{ my: 2, color: 'white', display: 'block' }}>
							Registracija
						</Button>
						<Button onClick={() => navigate('/user/1')} sx={{ my: 2, color: 'white', display: 'block' }}>
							Vartotojo profilis
						</Button>
					</>
				)}
				<Button onClick={() => setShowAll(!showAll)} sx={{ my: 2, color: 'white', display: 'block' }}>
					{showAll ? 'Rodyti mažiau' : 'Rodyti visas navigacijas'}
				</Button>
			</Box>
		</AppBar>
	);
}

export default NavigationBar;
