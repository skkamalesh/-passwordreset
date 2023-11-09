import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import axios from 'axios';

const CreateUser = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
			[e.target.email]: e.target.email,
			[e.target.password]: e.target.password,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/create-user`,
				formData
			);

			if (response.status === 201) {
				toast.success('User created successfully', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					theme: 'light',
				});
				setFormData({
					name: '',
					email: '',
					password: '',
					confirmPassword: '',
				});
			}
		} catch (error) {
			toast.error(`${error.response.data.message}`, {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				theme: 'light',
			});
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container>
			<Wrapper>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							className='form-control'
							required
						/>
					</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							className='form-control'
							required
						/>
					</Form.Group>

					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							className='form-control'
							required
						/>
					</Form.Group>

					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
							className='form-control'
							required
						/>
					</Form.Group>

					{error && <Alert variant='danger'>{error}</Alert>}

					<Button
						className='mt-2'
						variant='primary'
						type='submit'
						disabled={loading}
					>
						{loading ? 'Creating User...' : 'Create User'}
					</Button>

					<div className='mt-3'>
						<Link to='/forget-password'>Forget Password</Link>
						{' | '}
						<Link to='/login'>Login</Link>
					</div>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default CreateUser;

const Wrapper = styled.div`
	width: 450px;
	height: 450px;
	background-color: #ff4d25;
	padding: 20px;
	border-radius: 15px;
`;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;