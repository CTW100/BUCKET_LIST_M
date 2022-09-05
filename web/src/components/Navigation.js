import Nav from 'react-bootstrap/Nav';

function Navigation() {
	return (
		<Nav>
			<Nav.Item>
				<Nav.Link to='/'>Main</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link to='/new'>New</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey='link-2'>Link</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey='disabled' disabled>
					Disabled
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}

export default Navigation;
