import axios from 'axios';
import {ApiResult} from './LoginApi';

export const createUserIdApi = async (
  userID: string,
  token: string,
): Promise<ApiResult> => {
  const CREATE_USER_ID_URL = 'http://localhost:3000/api/auth/create-user-id';
  try {
    const response = await axios.post(
      CREATE_USER_ID_URL,
      {
        userId: userID,
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
