import StyledDrawer from '../StyledComponents/StyledDrawer';
import Typography from '@mui/material/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DrawerHelper from './DrawerHelper';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const ReviewDrawer = () => (
    <StyledDrawer
        variant="permanent"
        anchor="right"
        elevation={3}
        PaperProps={{
            sx: {
                height: '50%',
                marginTop: '35vh',
                marginBottom: '25vh',
                right: 20,
                width: 300,
                border: '1px solid #f9f9f9',
            },
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%', width: '100%' }}>
            <Typography variant="h4" style={{ fontSize: '1.5rem', marginTop: '10px' }}>Perfume Reviews</Typography>
            <HelpOutlineIcon style={{ fontSize: '1.8rem', marginTop: '10px', marginLeft: '15px' }} />
        </div>
    </StyledDrawer>
);
export const FragranceDrawer = ({ menuItems, navigate }) => (
    <>
        <StyledDrawer variant="permanent" anchor="left"
            PaperProps={{
                sx: {
                    width: 250,
                    height: '100%',
                    marginTop: '-40vh',
                    left: 7,

                },
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', width: '100%' }}>
                <Typography variant="h4" style={{ marginTop: '30px' }}>
                    My Fragrances
                </Typography>
                <List>
                    {menuItems.map(item => (
                        <ListItem button key={item.text} onClick={() => navigate(item.path)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </StyledDrawer>
    </>
);

FragranceDrawer.propTypes = {
    navigate: PropTypes.func,
    menuItems: PropTypes.array
};

const Drawers = () => {
    const menuItems = DrawerHelper();
    const navigate = useNavigate();
    return (
        <>
            <FragranceDrawer menuItems={menuItems} navigate={navigate} />
        </>
    );
}

export default Drawers;