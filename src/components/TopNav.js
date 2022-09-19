import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const navStyling = {
    color: 'white',
    textDecoration: 'none',
    cursor: 'crosshair'
}

export default function TopNav () {
    return (
        <Navbar variant="light" className="justify-content-end p-2" style={{backgroundColor: "#358600"}}>
            <Container fluid>
                <Navbar.Brand style={navStyling}>
                    Chlorophyll
                </Navbar.Brand>
                <Nav.Item>
                    <Link to="/" style={navStyling}>Login</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/register" style={navStyling}>Register</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/chat" style={navStyling}>Chat</Link>
                </Nav.Item>
            </Container>
        </Navbar>
    );
}