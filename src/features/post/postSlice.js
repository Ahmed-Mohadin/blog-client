import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
  posts: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  message: '',
};

// Fetch all posts
export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAll',
  async (arg, thunkAPI) => {
    try {
      return await postService.fetchAllPosts();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch single post
export const fetchSinglePost = createAsyncThunk(
  'posts/fetchSingle',
  async (id, thunkAPI) => {
    try {
      return await postService.fetchSinglePost(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
        state.posts = [];
      })
      .addCase(fetchSinglePost.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = [action.payload];
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
        state.posts = [];
      });
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
