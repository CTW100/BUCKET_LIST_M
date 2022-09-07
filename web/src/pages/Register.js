import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../_actions/userAction';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [name, setName] = useState('');
	const [birth, setBirth] = useState('');
	const [sex, setSex] = useState('');
	const [phone, setPhone] = useState('');

	const onEmailHandler = (event) => {
		setEmail(event.target.value);
	};

	const onPasswordHandler = (event) => {
		setPassword(event.target.value);
	};

	const onPasswordConfirmationHandler = (event) => {
		setPasswordConfirmation(event.target.value);
	};

	const onNameHandler = (event) => {
		setName(event.target.value);
	};

	const onBirthHandler = (event) => {
		setBirth(event.target.value);
	};

	const onSexHandler = (event) => {
		console.log(event.target.value);
		setSex(event.target.value);
	};

	const onPhoneHandler = (event) => {
		setPhone(event.target.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		if (password !== passwordConfirmation) {
			alert('비밀번호와 비밀번호 재확인은 같아야 합니다.');
		}

		let body = {
			email: email,
			password: password,
			name: name,
			sex: sex,
			birth: birth,
			phone: phone,
		};

		dispatch(registerUser(body)).then((response) => {
			if (response.payload.registerSuccess) {
				navigate('/');
			} else {
				alert('Failed to Sign Up');
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

			{/* 비밀번호 재확인 */}
			<Form.Group className='mb-3'>
				<Form.Label>비밀번호 재확인</Form.Label>
				<Form.Control
					type='password'
					onChange={onPasswordConfirmationHandler}
				/>
			</Form.Group>

			{/* 이름 */}
			<Form.Group className='mb-3'>
				<Form.Label>이름</Form.Label>
				<Form.Control type='text' onChange={onNameHandler} />
			</Form.Group>

			{/* 생년월일 */}
			<Form.Group className='mb-3'>
				<Form.Label>생년월일</Form.Label>
				<Form.Control type='text' onChange={onBirthHandler} />
			</Form.Group>

			{/* 성별 */}
			<Form.Group className='mb-3'>
				<Form.Select size='sm' onChange={onSexHandler}>
					<option>-</option>
					<option>남자</option>
					<option>여자</option>
				</Form.Select>
			</Form.Group>

			{/* 휴대전화 */}
			<Form.Group className='mb-3'>
				<Form.Label>전화번호</Form.Label>
				<Form.Control type='text' onChange={onPhoneHandler} />
			</Form.Group>

			<Button variant='primary' type='submit'>
				Submit
			</Button>
		</Form>
	);
}

export default Register;
