import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getHomeWeatherApi} from '../../ApiService/HomeWeatherApi';
import type {ApiResult} from '../../ApiService/LoginApi';

export type WeatherData = {
    location: string;
    temperature: string;
    temperatureUnit: string;
    description: string;
    isDayTime: boolean;
}

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

type HomeState = {
  data: ApiResult | null;
  loading: boolean;
  error: string | null;
};

const initialState: HomeState = {
  data: null,
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    logout: state => {
      state.data = null;
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
      });
  },
});

export default homeSlice.reducer;
