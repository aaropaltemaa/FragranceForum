import { useSelector } from 'react-redux';
import MenuHeader from './MenuHeader';
import Drawers, { ReviewDrawer } from './Drawers';
import NavBarModels from './NavBarModels';
import useNotification from '../../hooks/useNotification';

const Menu = () => {
    const loggedInUser = useSelector((state) => {
        const loggedInUserId = state.login.user?.id;
        return state.users.find(user => user.id === loggedInUserId);
    });
    const user = useSelector(state => state.login.user) || loggedInUser;

    const { AlertComponent } = useNotification();


    return (
        <div>
            <AlertComponent />
            <MenuHeader user={user} />
            <NavBarModels />
            <Drawers />
            <ReviewDrawer />
        </div>
    );
};

export default Menu;
