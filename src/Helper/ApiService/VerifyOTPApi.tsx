import axios from 'axios';
import {ApiResult} from './LoginApi';
import BASE_URL from './ApiConfig';

export const verifyOTPApi = async (
  otp: string,
  apiResult: ApiResult,
): Promise<ApiResult> => {
  const VERIFY_OTP_URL = `${BASE_URL}/api/auth/verify-otp`;
  try {
    const response = await axios.post(
      VERIFY_OTP_URL,
      {otp: otp},
      {
        headers: {
          Authorization: `Bearer ${apiResult.tempToken}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        'Failed to verify OTP. Please try again.',
    );
  }
};
