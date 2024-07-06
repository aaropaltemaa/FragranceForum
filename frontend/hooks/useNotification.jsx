import { useState } from 'react';
import Alert from '@mui/material/Alert';

const useNotification = () => {
    const [notification, setNotification] = useState(null);

    const showSuccessAlert = (message) => {
        setNotification({ type: 'success', message });
        setTimeout(hideAlert, 5000);
        console.log('showSuccessAlert', message);
    };

    const showErrorAlert = (message) => {
        setNotification({ type: 'error', message });
        setTimeout(hideAlert, 5000);
        console.log('showErrorAlert', message);
    };

    const hideAlert = () => {
        setNotification(null);
        console.log('hideAlert', notification);
    };

    const AlertComponent = () => {
        if (!notification) return null;

        const { type, message } = notification;

        return (
            <Alert severity={type} onClose={hideAlert} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                {message}
            </Alert>
        );
    };

    return { showSuccessAlert, showErrorAlert, AlertComponent };
};

export default useNotification;
