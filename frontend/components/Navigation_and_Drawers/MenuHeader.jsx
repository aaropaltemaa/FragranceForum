import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import StyledAppBar from '../StyledComponents/StyledAppBar';
import StyledToolBar from '../StyledComponents/StyledToolBar';
import PropTypes from 'prop-types';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const MenuHeader = ({ user }) => {
    if (!user) {
        user = JSON.parse(localStorage.getItem('loggedInUser'));
    }


    let buttons;
    if (user) {
        buttons = (
            <>
                <Button component={Link} to="/logout" color="inherit" style={{ fontSize: '1.5rem' }}>log out</Button>
                <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <LogoutIcon style={{ fontSize: '1.5rem', color: 'inherit' }} />
                </div>
            </>
        );
    } else {
        buttons = (
            <>
                <Button component={Link} to="/login" color="inherit" style={{ fontSize: '1.5rem' }}>log in</Button>
                <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <LoginIcon style={{ fontSize: '1.5rem', color: 'inherit', marginTop: 14, }} />
                </div>
            </>
        );
    }

    return (
        <StyledAppBar>
            <StyledToolBar>
                <div style={{ flex: 0.91, display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                    <BubbleChartIcon style={{ fontSize: '2.0rem', color: 'inherit' }} />
                    <Button
                        component={Link}
                        to="/"
                        color="inherit"
                        style={{ fontSize: '2.5rem' }}
                    >
                        scent sphere
                    </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
                    <Button component={Link} to="/register" color="inherit" style={{ fontSize: '1.5rem', marginRight: '20px' }}>sign up</Button>
                    {buttons}
                </div>
            </StyledToolBar>
        </StyledAppBar>
    );
};

MenuHeader.propTypes = {
    user: PropTypes.object
};

export default MenuHeader;
