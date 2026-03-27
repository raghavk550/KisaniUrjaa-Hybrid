import axios from 'axios';

export type ApiResult = {
  message: string;
  token?: string;
  tempToken?: string;
  expiresAt?: string;
  user: User;
};

export type User = {
  email?: string;
  id: string;
  name?: string;
  number?: string;
  otp?: string;
  isProfileCreated: boolean;
  isUserIdCreated: boolean;
};

export const loginApi = async (number: string): Promise<ApiResult> => {
  const LOGIN_URL = 'http://localhost:3000/api/auth/login';
  const response = await axios.post(LOGIN_URL, {
    number: number,
  });
  return response.data;
};
