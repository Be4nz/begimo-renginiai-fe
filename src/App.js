import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import RunList from './pages/RunList';
import RunView from './pages/RunView';
import UserProfile from './pages/UserProfile';
import CommentList from './pages/CommentList';
import NavigationBar from './components/navigation/NavigationBar';
import NewPassword from './pages/NewPassword';
import ChangePassword from './pages/ChangePassword';
import CreateRun from './pages/CreateRun';
import RunWheater from './pages/RunWheater';
import RunMap from './pages/RunMap';
import EditRun from './pages/EditRun';
import InviteForm from './pages/InviteForm';
import InviteList from './pages/InviteList';
import SentInviteList from './pages/SentInviteList';
import MakeCommentForm from './pages/MakeCommentForm';
import UpdateCommentForm from './pages/UpdateCommentForm';
import EventRegistration from './pages/EventRegistration';
import EventRegistrationView from './pages/EventRegistrationView';
import UpdateEventRegistration from './pages/UpdateEventRegistration';
import Calendar from './pages/Calendar';
import InviteView from './pages/InviteView';
function App() {
	return (
		<div className='App'>
			<Router>
			<NavigationBar />
			{!localStorage.getItem('user') && !['/login', '/register'].includes(window.location.pathname) && !window.location.pathname.startsWith('/changepassword') && <Navigate to='/login' replace />}
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/register-event/:id' element={<EventRegistration />} />
					<Route path='/register-event-view/:id' element={<EventRegistrationView />} />
					<Route path='/update-event-registration/:id' element={<UpdateEventRegistration />} />
					<Route path='/calendar' element={<Calendar />} />
					<Route path='/make-comment/:id' element={<MakeCommentForm />} />
					<Route path='/update-comment/:id' element={<UpdateCommentForm />} />
					<Route path='/changepassword' element={<ChangePassword />} />
					<Route path='/create-run/:id' element={<CreateRun />} />
					<Route path='/register' element={<Register />} />
					<Route path='/run-list' element={<RunList />} />
					<Route path='/run/:id' element={<RunView />} />
					<Route path='/edit-run/:id' element={<EditRun />} />
					<Route path='/user/:id' element={<UserProfile />} />
					<Route path='/run/:id/comments' element={<CommentList />} />
					<Route path='/run/:id/weather' element={<RunWheater />} />
					<Route path='/run/:id/map' element={<RunMap />} />
					<Route path='/changepassword/:id/' element={<NewPassword />} />
					<Route path='/invite-form/:id' element={<InviteForm />} />
					<Route path='/invite-list' element={<InviteList />} />
					<Route path='/invite/:id' element={<InviteView />} />
					<Route path='/sent-invite-list' element={<SentInviteList />} />
					<Route path='*' element={<Navigate to={'/login'} replace />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
