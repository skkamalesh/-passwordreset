import React from 'react';
import ForgetPassword from './component/ForgetPassword';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CreateUser from './component/CreateUser';
import Login from './component/Login';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/forget-password' element={<ForgetPassword />} />
					<Route path='/create-user' element={<CreateUser />} />
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<Navigate to='/create-user' />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;