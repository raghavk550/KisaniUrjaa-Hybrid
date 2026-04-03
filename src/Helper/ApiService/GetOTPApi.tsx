import axios from 'axios';
import {ApiResult} from './LoginApi';
import BASE_URL from './ApiConfig';

export const getOTPApi = async (number: string): Promise<ApiResult> => {
  const OTP_URL = `${BASE_URL}/api/auth/get-otp`;
  try {
    const response = await axios.post(OTP_URL, {number});
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to get OTP. Please try again.',
    );
  }
};
