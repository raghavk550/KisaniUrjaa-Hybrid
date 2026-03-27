import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loginApi} from '../../ApiService/LoginApi';
import {ApiResult} from '../../ApiService/LoginApi';
import {getOTPApi} from '../../ApiService/GetOTPApi';
import {verifyOTPApi} from '../../ApiService/VerifyOTPApi';
import {resendOTPApi} from '../../ApiService/ResendOTPApi';
import {createUserIdApi} from '../../ApiService/CreateUserIdApi';
import {createPasswordApi} from '../../ApiService/CreatePasswordApi';
import {LogoutApi} from '../../ApiService/LogoutApi';

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
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (number: string, thunkAPI) => {
    try {
      const data = await loginApi(number);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

// 🔥 Async thunk
export const getOTP = createAsyncThunk(
  'auth/getOTP',
  async (number: string, thunkAPI) => {
    try {
      const data = await getOTPApi(number);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

// 🔥 Async thunk
export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async (apiResult: ApiResult, thunkAPI) => {
    try {
      const data = await resendOTPApi(apiResult);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

// 🔥 Async thunk
export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({otp, apiResult}: {otp: string; apiResult: ApiResult}, thunkAPI) => {
    try {
      const data = await verifyOTPApi(otp, apiResult);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

// 🔥 Async thunk
export const createUserId = createAsyncThunk(
  'auth/createUserId',
  async (
    {userId, apiResult}: {userId: string; apiResult: ApiResult},
    thunkAPI,
  ) => {
    try {
      const data = await createUserIdApi(userId, apiResult);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

// 🔥 Async thunk
export const createPassword = createAsyncThunk(
  'auth/createPassword',
  async (
    {password, apiResult}: {password: string; apiResult: ApiResult},
    thunkAPI,
  ) => {
    try {
      const data = await createPasswordApi(password, apiResult);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

// 🔥 Async thunk
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async ({apiResult}: {apiResult: ApiResult}, thunkAPI) => {
    try {
      const data = await LogoutApi(apiResult);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

type AuthState = {
  data: ApiResult | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  data: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.data = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getOTP.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOTP.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resendOTP.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createUserId.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, _) => {
        state.loading = false;
        state.data = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
