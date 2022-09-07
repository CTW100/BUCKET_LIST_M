import Nav from 'react-bootstrap/Nav';

function Navigation() {
	return (
		<Nav>
			<Nav.Item>
				<Nav.Link href='/'>Main</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href='/new'>New</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href='/user/register'>Register</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}

export default Navigation;
