import axios from 'axios';
import {ApiResult} from './LoginApi';

export const resendOTPApi = async (
  apiResult: ApiResult,
): Promise<ApiResult> => {
  const RESEND_OTP_URL = 'http://localhost:3000/api/auth/resend-otp';
  try {
    const response = await axios.post(
      RESEND_OTP_URL,
      {},
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
        'Failed to resend OTP. Please try again.',
    );
  }
};
