import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)({
    page: {
        background: '#f9f9f9',
        width: '100%',
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
        height: '50%',
        marginTop: '64px',
        marginBottom: '64px',
    },
    root: {
        display: 'flex',
    },
    active:
    {
        background: '#f4f4f4',
    },
})

export default StyledDrawer;
