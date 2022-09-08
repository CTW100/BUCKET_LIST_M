import react, { useEffect, useState } from 'react';
import BucketCard from '../components/BucketCard';
import { Link } from 'react-router-dom';
const axios = require('axios');

function Main() {
	const [buckets, setBuckets] = useState([]);

	useEffect(() => {
		axios.get('/api/getBuckets').then((response) => {
			if (response.data.buckets) {
				console.log(response.data.buckets);
				setBuckets(response.data.buckets);
			} else {
				alert('Failed to get BUCKETS');
			}
		});
	}, []);

	const result = buckets.map((bucket, index) => (
		<Link to={`/buckets/${bucket._id}`} key={index}>
			<BucketCard
				title={bucket.title}
				filepath={bucket.filepath}
				comment={bucket.comment}
			/>
		</Link>
	));

	return (
		<div>
			<h1>UR BUCKETS</h1>
			{result}
		</div>
	);
}

export default Main;
