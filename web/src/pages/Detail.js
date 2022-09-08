import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
const axios = require('axios');

function Detail() {
	const { bucketID } = useParams();
	const bucketVariable = {
		bucketID: bucketID,
	};

	const [bucket, setBucket] = useState({});

	useEffect(() => {
		axios.post('/api/bucket/getBucket', bucketVariable).then((response) => {
			if (response.data.findSuccess) {
				console.log(response.data.bucket);
				setBucket(response.data.bucket[0]);
			} else {
				alert('Failed to find BUCKET');
			}
		});
	}, []);

	return (
		<div>
			<h1>{bucket.title}</h1>
			<Image
				src={`https://bucket-list-api.run.goorm.io/${bucket.filepath}`}
			/>
		</div>
	);
}

export default Detail;
