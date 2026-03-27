import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import authReducer from '../Auth/AuthSlice';

export const userStore = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;
