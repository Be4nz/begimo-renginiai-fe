import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RunList from './pages/RunList';
import RunView from './pages/RunView';
import UserProfile from './pages/UserProfile';
import CommentList from './pages/CommentList';
import NavigationBar from './components/navigation/NavigationBar';
import NewPassword from './pages/NewPassword';
import ChangePassword from './pages/ChangePassword'

function App() {
	return (
		<div className='App'>
			<Router>
				<NavigationBar />
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/changepassword' element={<ChangePassword/>} />
					<Route path='/register' element={<Register />} />
					<Route path='/run-list' element={<RunList />} />
					<Route path='/run/:id' element={<RunView />} />
					<Route path='/user/:id' element={<UserProfile />} />
					<Route path='/run/:id/comments' element={<CommentList />} />
					<Route path='/changepassword/:id/' element={<NewPassword />} />
					<Route path='*' element={<Navigate to={'/login'} replace />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;