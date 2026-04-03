import axios from 'axios';
import BASE_URL from './ApiConfig';
import type {WeatherData} from '../Redux/Home/HomeSlice';

export type ApiResult = {
  message: string;
  token?: string;
  tempToken?: string;
  expiresAt?: string;
  user?: User;
  weatherData?: WeatherData;
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
  const LOGIN_URL = `${BASE_URL}/api/auth/login`;
  const response = await axios.post(LOGIN_URL, {
    number: number,
  });
  return response.data;
};
