import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './UserStore';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value >= 1 ? state.value -= 1 : 0;
        },
    },
});

export const {increment, decrement} = userSlice.actions;

export const selectCount = (state: RootState) => state.user.value;

export default userSlice.reducer;
