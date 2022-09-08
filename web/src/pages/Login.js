import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../_actions/userAction';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onEmailHandler = (event) => {
		setEmail(event.target.value);
	};

	const onPasswordHandler = (event) => {
		setPassword(event.target.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		let body = {
			email: email,
			password: password,
		};

		dispatch(loginUser(body)).then((response) => {
			if (response.payload.loginSuccess) {
				window.localStorage.setItem('userId', response.payload.userId);
				navigate('/');
			} else {
				alert('Failed to Log in');
			}
		});
	};

	return (
		<Form onSubmit={onSubmitHandler}>
			{/* 이메일 */}
			<Form.Group className='mb-3'>
				<Form.Label>이메일</Form.Label>
				<Form.Control type='email' onChange={onEmailHandler} />
			</Form.Group>

			{/* 비밀번호 */}
			<Form.Group className='mb-3'>
				<Form.Label>비밀번호</Form.Label>
				<Form.Control type='password' onChange={onPasswordHandler} />
			</Form.Group>

			<Button variant='primary' type='submit'>
				Login
			</Button>
		</Form>
	);
}

export default Login;
