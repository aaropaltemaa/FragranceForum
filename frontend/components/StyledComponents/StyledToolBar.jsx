import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

const StyledToolBar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
    color: 'black',
    elevation: 0,
    boxShadow: 'none',
});

export default StyledToolBar;