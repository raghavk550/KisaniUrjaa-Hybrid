import axios from 'axios';
import {ApiResult} from './LoginApi';

export const LogoutApi = async (token: string): Promise<ApiResult> => {
  const LOGOUT_URL = 'http://localhost:3000/api/auth/logout';
  try {
    const response = await axios.post(
      LOGOUT_URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to logout. Please try again.',
    );
  }
};
