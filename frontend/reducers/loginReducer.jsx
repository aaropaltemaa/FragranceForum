import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginService from '../services/login';
import fragranceService from '../services/fragrances';
import { initializeUsers } from './usersReducer';

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async ({ username, password, onSuccess }, { dispatch }) => {
        const user = await loginService.login({ username, password });
        window.localStorage.setItem('loggedFragranceappUser', JSON.stringify(user));
        fragranceService.setToken(user.token);
        dispatch(initializeUsers());
        if (onSuccess) onSuccess();
        return user;
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        username: '',
        password: '',
        user: null,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        logoutUser: (state) => {
            window.localStorage.removeItem('loggedFragranceappUser');
            state.user = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        initializeLoginFromStorage: (state) => {
            const loggedUserJSON = window.localStorage.getItem('loggedFragranceappUser');
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON);
                state.user = user;
                fragranceService.setToken(user.token);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.username = '';
            state.password = '';
        });
    },
});

export const { setUsername, setPassword, logoutUser, setUser, initializeLoginFromStorage } = loginSlice.actions;

export default loginSlice.reducer;
