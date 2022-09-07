import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BucketCard(props) {
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Img
				variant='top'
				src={`https://bucket-list-api.run.goorm.io/${props.filepath}`}
			/>
			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text>{props.comment}</Card.Text>
				<Button variant='primary'>Check it</Button>
			</Card.Body>
		</Card>
	);
}

export default BucketCard;
