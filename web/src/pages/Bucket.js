import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Dropzone from 'react-dropzone';
import { BsPlusLg } from 'react-icons/bs';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';

const axios = require('axios');

function Bucket(props) {
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [filepath, setFilepath] = useState('');
	const [preference, setPreference] = useState('');
	const [comment, setComment] = useState('');

	const onTitleHandler = (event) => {
		setTitle(event.target.value);
	};

	const onUrlHandler = (event) => {
		setUrl(event.target.value);
	};

	const onPrefenrenceHandler = (event) => {
		setPreference(event.target.value);
	};

	const onCommentHandler = (event) => {
		setComment(event.target.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		let body = {
			title: title,
			url: url,
			filepath: filepath,
			preference: preference,
			comment: comment,
		};

		axios
			.post(
				'https://bucket-list-api.run.goorm.io/api/bucket/createbucket',
				body
			)
			.then((response) => {
				console.log('response.data: ', response.data);
			});

		navigate('/');
	};

	const onDropHandler = (files) => {
		console.log('files: ', files);
		let formData = new FormData();
		const config = {
			header: { 'content-type': 'multipart/form-data' },
		};
		formData.append('file', files[0]);
		console.log('formData: ', formData);
		console.log('formData.file: ', formData.file);

		// axios send
		axios
			.post(
				'https://bucket-list-api.run.goorm.io/api/bucket/uploadbucket',
				formData,
				config
			)
			.then((response) => {
				if (response.data.uploadSuccess) {
					setFilepath(response.data.filepath);
				} else {
					alert('Failed to upload');
				}
			});
	};

	return (
		<Form onSubmit={onSubmitHandler}>
			{/* 제목 */}
			<Form.Group as={Row} className='mb-3'>
				<Form.Label column sm={2}>
					제목
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type='text'
						placeholder='제목'
						onChange={onTitleHandler}
					/>
				</Col>
			</Form.Group>

			{/* 링크 */}
			<Form.Group as={Row} className='mb-3'>
				<Form.Label column sm={2}>
					링크
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type='text'
						placeholder='URL'
						onChange={onUrlHandler}
					/>
				</Col>
			</Form.Group>

			{/* Video Look */}
			<Dropzone onDrop={onDropHandler}>
				{({ getRootProps, getInputProps }) => (
					<section>
						<div
							style={{
								width: '300px',
								height: '240px',
								border: '1px solid lightgray',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							{...getRootProps()}
						>
							<input {...getInputProps()} />
							<BsPlusLg style={{ fontSize: '3rem' }} />
						</div>
					</section>
				)}
			</Dropzone>
			{filepath !== null && (
				<Image
					src={`https://bucket-list-api.run.goorm.io/${filepath}`}
					roundedCircle={true}
				/>
			)}

			{/* 선호도 */}
			<fieldset>
				<Form.Group as={Row} className='mb-3'>
					<Form.Label>Range</Form.Label>
					<Form.Range onChange={onPrefenrenceHandler} />
				</Form.Group>
			</fieldset>

			{/* 기대하는 감정선 */}

			<Form.Group className='mb-3'>
				<Form.Label>기대하는 감정선</Form.Label>
				<Form.Control
					as='textarea'
					rows={3}
					onChange={onCommentHandler}
				/>
			</Form.Group>

			{/* 생성 버튼 */}
			<Form.Group as={Row} className='mb-3'>
				<Col sm={{ span: 10, offset: 2 }}>
					<Button type='submit'>Create</Button>
				</Col>
			</Form.Group>
		</Form>
	);
}

export default Bucket;
