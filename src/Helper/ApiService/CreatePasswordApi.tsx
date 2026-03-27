import axios from 'axios';
import {ApiResult} from './LoginApi';

export const createPasswordApi = async (
  password: string,
  apiResult: ApiResult,
): Promise<ApiResult> => {
  const CREATE_PASSWORD_URL = 'http://localhost:3000/api/auth/create-password';
  try {
    const response = await axios.post(
      CREATE_PASSWORD_URL,
      {
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${apiResult.token}`,
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
