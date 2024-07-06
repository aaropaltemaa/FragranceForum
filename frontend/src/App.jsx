import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Menu from '../components/Navigation_and_Drawers//Menu';
import { theme } from '../components/StyledComponents/Theme';
import LoginForm from '../components/Forms/LoginForm';
import RegisterForm from '../components//Forms/RegisterForm';
import useNotification from '../hooks/useNotification';
import FragrancePage from '../components/Display_Reviews/FragrancePage';
import MenuHeader from '../components/Navigation_and_Drawers/MenuHeader';
import { useSelector } from 'react-redux';
import Drawers from '../components/Navigation_and_Drawers/Drawers';
import { initializeLoginFromStorage } from '../reducers/loginReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LogoutHandler from '../components/Navigation_and_Drawers/LogoutHandler';
import FragranceBrandsPage from '../components/Brands/FragranceBrandsPage';

const App = () => {
  const { AlertComponent } = useNotification();
  const loggedInUser = useSelector((state) => {
    const loggedInUserId = state.login.user?.id;
    return state.users.find(user => user.id === loggedInUserId);
  });
  const user = useSelector(state => state.login.user) || loggedInUser;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeLoginFromStorage());
  }
    , [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MenuHeader user={user} />
        <Drawers />
        <AlertComponent />
        <div className="main-content" style={{ paddingTop: '100px' }}>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/fragrances/*" element={<FragrancePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<LogoutHandler />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/brands" element={<FragranceBrandsPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
