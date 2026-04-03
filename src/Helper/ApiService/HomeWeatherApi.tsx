import axios from 'axios';
import {ApiResult} from './LoginApi';
import BASE_URL from './ApiConfig';

export const getHomeWeatherApi = async (
  lat: string,
  lon: string,
  token: string,
): Promise<ApiResult> => {
  const HOME_WEATHER_URL = `${BASE_URL}/api/home/get-weather`;
  try {
    const response = await axios.post(
      HOME_WEATHER_URL,
      {
        lat: lat,
        long: lon,
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
        'Failed to fetch weather data. Please try again.',
    );
  }
};
