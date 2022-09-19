import { useEffect, useState, Text } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { sha224 } from 'js-sha256';
import { Button, Alert, Container, Row } from 'react-bootstrap';
import TopNav from "./TopNav";
// import '../styles/page-gradient.css'

export default function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    const [alert, showAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchAuth();
        document.title="Chlorophyll | Login";
    }, []);

    const fetchAuth = async () => {
        await axios.post('/authenticate-token')
            .then(response => {
                console.log(response.data);
                setAuthenticated(response.data.authenticated);
            })
            .catch(error => {
                setAuthenticated(false);
                setAlertMessage(error.response.data);
                showAlert(true);
            });
    }

    const handleLogin = async () => {
        if (username === '' || password === '') {
            setAlertMessage('Username and password cannot be left blank.');
            showAlert(true);
        }
        else if (username.length > 255) {
            setAlertMessage('Usernames must be less than or equal to 255 characters');
            setUsername('');
            showAlert(true);
        } else if (password.length > 50) {
            setAlertMessage('Passwords must be less than or equal to 50 characters');
            setPassword('');
            showAlert(true);
        }
        else {
            await axios
                .post('/authenticate-login', {
                    "username": username,
                    "password": sha224(password)
                })
                .then(response => {
                    setAlertMessage(response.data.message);
                    showAlert(true);
                    if (response.data.message === 'User login successful.') {window.location.replace('/chat')}
                })
                .catch(e => {
                    setAlertMessage(e.response.data);
                    showAlert(true);
                });
        }
    }

    const AlertContainer = () => {
        return (
            <Alert show={alert} onClose={() => showAlert(false)} className="mt-5" dismissible>
                <Alert.Heading>Alert</Alert.Heading>
                <p>{alertMessage}</p>
            </Alert>
        );
    }

    if (authenticated) {
        return (
            <Navigate to={'/chat'} />
        )
    } else {
        return (
            <>
                <TopNav />
                    <Container className="d-flex align-items-center justify-content-center mt-5 p-3 rounded-3">
                        <input className="form form-control" placeholder="username" type='text' onChange={(e) => setUsername(e.target.value)} required />
                        <input className="form form-control" placeholder="password" type='password' onChange={(e) => setPassword(e.target.value)} required />
                        <Button className="m-2" variant="light" type="submit" onClick={handleLogin}>Login</Button>
                    </Container>
                <AlertContainer />
            </>
        )
    }
}