import axios from 'axios';
import {ApiResult} from './LoginApi';
import BASE_URL from './ApiConfig';

export const createPasswordApi = async (
  password: string,
  token: string,
): Promise<ApiResult> => {
  const CREATE_PASSWORD_URL = `${BASE_URL}/api/auth/create-password`;
  try {
    const response = await axios.post(
      CREATE_PASSWORD_URL,
      {
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        'Failed to create user ID. Please try again.',
    );
  }
};
