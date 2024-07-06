import { registerUser } from '../../reducers/registerReducer';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography, Container } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useNotification from '../../hooks/useNotification';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [justRegistered, setJustRegistered] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { showSuccessAlert, showErrorAlert, AlertComponent } = useNotification();

    useEffect(() => {
        if (justRegistered) {
            navigate('/');
            setJustRegistered(false);
        }
    }, [justRegistered, navigate]);

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const resultAction = await dispatch(registerUser({ username, password }));
            unwrapResult(resultAction);
            showSuccessAlert("Registration successful!");
            setJustRegistered(true);
        } catch (error) {
            showErrorAlert("Failed to register. Please try again.");
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '16px' }}>
            <Typography variant="h4" style={{ marginBottom: '16px' }}>Sign Up</Typography>
            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '16px' }}>
                    <TextField
                        type="text"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        inputProps={{
                            'data-testid': 'register-username',
                        }}
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        inputProps={{
                            'data-testid': 'register-password',
                        }}
                    />
                    <TextField
                        type="password"
                        label="Confirm Password"
                        helperText="Do not share your password with anyone."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        inputProps={{
                            'data-testid': 'register-confirm-password',
                        }}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary">sign up</Button>
                <AlertComponent />
            </form>
        </Container>
    );
}

export default RegisterForm;