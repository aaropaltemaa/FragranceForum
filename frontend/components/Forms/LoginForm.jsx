import { setUsername, setPassword, logoutUser, loginUser } from "../../reducers/loginReducer";
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Container } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../hooks/useNotification';
import { useEffect, useState } from 'react';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showSuccessAlert, showErrorAlert, AlertComponent } = useNotification();
    const username = useSelector(state => state.login.username);
    const password = useSelector(state => state.login.password);
    const [justLoggedIn, setJustLoggedIn] = useState(false);

    useEffect(() => {
        if (justLoggedIn) {
            navigate('/');
            setJustLoggedIn(false);
        }
    }, [justLoggedIn, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const resultAction = await dispatch(loginUser({
                username,
                password,
                onSuccess: () => {
                    navigate('/');
                    showSuccessAlert('Logged in successfully!');
                }
            }));
            unwrapResult(resultAction);
        } catch (error) {
            showErrorAlert('Failed to log in. Please try again.');
        }
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        showSuccessAlert('Logged out successfully!');
        setJustLoggedIn(true);
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '16px' }}>
            <Typography variant="h4" style={{ marginBottom: '16px' }}>Login</Typography>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '16px' }}>
                    <TextField
                        type="text"
                        label="Username"
                        value={username}
                        onChange={({ target }) => dispatch(setUsername(target.value))}
                        fullWidth
                        inputProps={{
                            'data-testid': 'username-input',
                        }}
                    />

                    <TextField
                        type="password"
                        label="Password"
                        helperText="Do not share your password with anyone."
                        value={password}
                        onChange={({ target }) => dispatch(setPassword(target.value))}
                        fullWidth
                        inputProps={{
                            'data-testid': 'password-input',
                        }}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary" style={{ marginBottom: '16px' }}>Login</Button>
            </form>
            <Button onClick={handleLogout} variant="contained" color="secondary">Logout</Button>
            <AlertComponent />
        </Container>
    );
}
export default LoginForm;
