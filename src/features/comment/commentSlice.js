import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from './commentService';

const initialState = {
  comments: {},
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  message: '',
};

// Create comment
export const createComment = createAsyncThunk(
  'comment/create',
  async (commentData, thunkAPI) => {
    try {
      return await commentService.createComment(commentData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(JSON.stringify(message));
    }
  }
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = { ...action.payload };
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
        state.comments = {};
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
