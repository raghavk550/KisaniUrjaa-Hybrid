import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getHomeWeatherApi} from '../../ApiService/HomeWeatherApi';
import type {ApiResult} from '../../ApiService/LoginApi';
import {getAllNewsApi} from '../../ApiService/GetNewsApi';
import { getNewsDetailsApi } from '../../ApiService/GetNewsDetailsApi';

export type WeatherData = {
  location: string;
  temperature: string;
  temperatureUnit: string;
  description: string;
  isDayTime: boolean;
};

export type NewsData = {
  _id: string;
  newsTitle: string;
  newsDescription: string;
  newsPublishedAt: string;
  isShowPlaceholder: boolean;
  newsId: string;
  newsSubDesc: string;
  newsDesc: string;
  publishedAt: string;
  newsSourceName: string;
  newsSource: string;
};

const getErrorMessage = (error: any): string => {
  const responseData = error?.response?.data;

  if (typeof responseData === 'string') {
    return responseData;
  }

  if (typeof responseData?.message === 'string') {
    return responseData.message;
  }

  if (typeof error?.message === 'string') {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
};

// 🔥 Async thunk
export const getWeather = createAsyncThunk(
  'home/getWeather',
  async (
    {lat, lon, token}: {lat: string; lon: string; token: string},
    thunkAPI,
  ) => {
    try {
      const data = await getHomeWeatherApi(lat, lon, token);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getAllNews = createAsyncThunk(
  'home/getAllNews',
  async (token: string, thunkAPI) => {
    try {
      const data = await getAllNewsApi(token);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getNewsDetails = createAsyncThunk(
  'home/getNewsDetails',
  async ({ token, newsId }: { token: string; newsId: string }, thunkAPI) => {
    try {
      const data = await getNewsDetailsApi(token, newsId);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

type HomeState = {
  data: ApiResult | null;
  news: ApiResult | null;
  newsDetails: ApiResult | null;
  loading: boolean;
  error: string | null;
};

const initialState: HomeState = {
  data: null,
  news: null,
  newsDetails: null,
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    logout: state => {
      state.data = null;
      state.news = null;
      state.newsDetails = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllNews.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getNewsDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.newsDetails = action.payload;
      })
      .addCase(getNewsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeSlice.reducer;
