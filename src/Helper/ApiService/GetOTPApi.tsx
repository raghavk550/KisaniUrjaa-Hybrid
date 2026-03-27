import axios from 'axios';
import {ApiResult} from './LoginApi';

export const getOTPApi = async (number: string): Promise<ApiResult> => {
  const OTP_URL = 'http://localhost:3000/api/auth/get-otp';
  try {
    const response = await axios.post(OTP_URL, {number});
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to get OTP. Please try again.',
    );
  }
};
