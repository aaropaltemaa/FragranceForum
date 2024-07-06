import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../reducers/loginReducer';
const LogoutHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = () => {
            if (window.confirm('Are you sure you want to logout?')) {
                dispatch(logoutUser());
                navigate('/');
            } else {
                navigate('/');
            }
        };

        handleLogout();
    }, [dispatch, navigate]);

    return null;
};

export default LogoutHandler;