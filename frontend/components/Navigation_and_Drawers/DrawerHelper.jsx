import { AddCircleOutlineOutlined } from '@mui/icons-material'
import HomeIcon from '@mui/icons-material/Home'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const DrawerHelper = () => {
    const menuItems = [
        { text: 'Home', icon: <HomeIcon color="tertiary" />, path: '/' },
        { text: 'Create Review', icon: <AddCircleOutlineOutlined color="tertiary" />, path: '/fragrances' },
        { text: 'Brands', icon: <LocalOfferIcon color="tertiary" />, path: '/brands' }
    ];

    return menuItems;
}



export default DrawerHelper;
