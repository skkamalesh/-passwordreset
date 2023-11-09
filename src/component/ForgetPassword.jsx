import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const ForgetPassword = () => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleForgetPassword = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/forget-password`,
				{ email }
			);
			if (response.status === 200) {
				toast.success('Reset link send to your email', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					theme: 'light',
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
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container>
			<Wrapper>
				<Form onSubmit={handleForgetPassword}>
					<Form.Group controlId='formEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Button
						className='mt-2'
						variant='primary'
						type='submit'
						disabled={loading}
					>
						{loading ? 'Processing...' : 'Confirm'}
					</Button>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default ForgetPassword;

const Wrapper = styled.div`
	width: 400px;
	height: 150px;
	background-color: #ffffff4f;
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