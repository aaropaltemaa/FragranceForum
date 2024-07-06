import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginService from '../services/login';
import { loginUser } from './loginReducer';

export const registerUser = createAsyncThunk(
    'register/registerUser',
    async ({ username, password }, { dispatch }) => {
        try {
            const user = await loginService.register({ username, password });
            console.log('User registered:', user);
            window.localStorage.setItem('loggedFragranceappUser', JSON.stringify(user));
            dispatch(loginUser({ username, password }));
            return user;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        user: null,
        registrationError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.registrationError = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = null;
                state.registrationError = action.error.message;
            });
    },
});

export default registerSlice.reducer;