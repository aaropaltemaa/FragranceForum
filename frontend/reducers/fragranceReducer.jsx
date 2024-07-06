import { createSlice } from '@reduxjs/toolkit';
import fragranceService from '../services/fragrances';

const fragranceSlice = createSlice({
    name: 'fragrances',
    initialState: [],
    reducers: {
        setFragrances: (state, action) => {
            return action.payload;
        },
        fragranceToRemove: (state, action) => {
            return state.filter(fragrance => fragrance.id !== action.payload);
        },
        fragranceToLike: (state, action) => {
            return state.map(fragrance =>
                fragrance.id === action.payload.id ? { ...fragrance, likes: action.payload.likes } : fragrance
            )
        },
    },
});

export const initializeFragrances = () => {
    return async (dispatch) => {
        const fragrances = await fragranceService.getAll();
        dispatch(setFragrances(fragrances));
        return fragrances;
    };
};

export const removeFragrance = (id) => {
    return async (dispatch) => {
        try {
            const response = window.confirm('Are you sure you want to delete this review?');
            if (response) {
                await fragranceService.remove(id);
                dispatch(fragranceToRemove(id));
            }
        }
        catch (error) {
            console.log('Error removing fragrance', error);
        }
    };
}

export const likeFragrance = (fragrance, user) => {
    return async (dispatch) => {
        try {
            const updatedFragrance = await fragranceService.like(fragrance, user);
            updatedFragrance.user = user;
            dispatch(fragranceToLike(updatedFragrance));
        } catch (error) {
            console.log('Error liking fragrance', error);
        }
    }
}

export const { setFragrances, fragranceToRemove, fragranceToLike } = fragranceSlice.actions;

export default fragranceSlice.reducer;