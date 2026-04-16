import axios from 'axios';
import {ApiResult} from './LoginApi';
import BASE_URL from './ApiConfig';

export const getNewsDetailsApi = async (
  token: string,
  newsId: string,
): Promise<ApiResult> => {
  const ALL_NEWS_DETAILS_URL = `${BASE_URL}/api/home/get-news-details`;
  try {
    const response = await axios.post(
      ALL_NEWS_DETAILS_URL,
      {
        newsId: newsId,
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
        'Failed to fetch news data. Please try again.',
    );
  }
};
