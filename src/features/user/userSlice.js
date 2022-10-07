import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  message: '',
};

// Sign up user
export const signUp = createAsyncThunk(
  'user/signUp',
  async (user, thunkAPI) => {
    try {
      return await userService.signUp(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(JSON.stringify(message));
    }
  }
);

// Sign in user
export const signIn = createAsyncThunk(
  'user/signIn',
  async (user, thunkAPI) => {
    try {
      return await userService.signIn(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(JSON.stringify(message));
    }
  }
);

export const signOut = createAsyncThunk('user/signOut', async () => {
  await userService.signOut();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
