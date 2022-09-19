import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { sha224 } from 'js-sha256';
import TopNav from "./TopNav";
import { Button, Alert, Container } from 'react-bootstrap';
// import '../styles/page-gradient.css';


export default function RegistrationForm() {

    const [alert, showAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        document.title="Chlorophyll | Register";
    });
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async () => {
        if (username === '' || password === '') {
            setAlertMessage('Username and password cannot be left blank.');
            showAlert(true);
        }
        else if (username.length > 25) {
            setAlertMessage('Usernames must be less than or equal to 25 characters');
            showAlert(true);
        } else if (password.length > 50 || password.length < 10) {
            setAlertMessage('Passwords must be between 10 and 50 characters in length.');
            showAlert(true);
        }
        else {
            await axios
                .post('/register-user', {
                    "username": username,
                    "password": sha224(password)
                })
                .then(response => {
                    // grab any errors / success message
                    setAlertMessage(response.data.message);
                    showAlert(true);
                })
                .catch(e => {
                    console.error(e)
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
    
    return (
        <>
            <TopNav />
            <Container className="d-flex align-items-center justify-content-center mt-5 p-3 rounded-3">
                    <input className="form form-control" placeholder="username" type='text' onChange={(e) => setUsername(e.target.value)} required />
                    <input className="form form-control" placeholder="password" type='password' onChange={(e) => setPassword(e.target.value)} required />
                    <Button className="m-2" variant="light" type="submit" onClick={handleRegistration}>Register</Button>
            </Container>
            <AlertContainer />
        </>
    );
}