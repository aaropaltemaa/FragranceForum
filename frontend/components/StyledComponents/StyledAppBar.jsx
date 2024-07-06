import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)({
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: 'white',
    color: 'black',
    elevation: 0,
    boxShadow: 'none',
});

export default StyledAppBar;