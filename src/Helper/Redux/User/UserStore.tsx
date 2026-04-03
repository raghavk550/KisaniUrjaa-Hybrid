import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import authReducer from '../Auth/AuthSlice';
import homeReducer from '../Home/HomeSlice';

export const userStore = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        home: homeReducer,
    },
});

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;
