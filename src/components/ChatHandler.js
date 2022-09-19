import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';

export default function ChatHandler() {
    const [username, setUsername] = useState();

    useEffect(() => {
        fetchAuth();
    }, [username]);

    const fetchAuth = async () => {
        await axios.post('/authenticate-token')
        .then(response => {
            console.log(response.data);
            setUsername(response.data.username);
        }).catch(() => {
            // handle redirect?
            window.location.replace('/');
        });
    }

    const sidePanelStyling = {
        background: 'grey',
    }

    const SidePanel = () => {
        return (
                <Col className='col-4 rounded' style={sidePanelStyling}>
                    <h4>Welcome, {username}.</h4>
                    <Card>
                        <Card.Body>
                            <Card.Title>Room ID</Card.Title>
                            <input className='form form-control' placeholder='ID' />
                            <Button className='mt-3 shadow' style={{backgroundColor: '#aaefdf', border: 'none', color: 'grey'}}>Join</Button>
                        </Card.Body>
                    </Card>
                </Col>   
        );
    }

    const ChatContainer = () => {
        return (
            <Col className='col mt-4 rounded'>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {/*  */}
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        );
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <SidePanel />
                    <ChatContainer />
                </Row>
            </Container>
            
        </>
    );
}