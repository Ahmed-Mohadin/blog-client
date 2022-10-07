import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/post/postSlice';
import userReducer from './features/user/userSlice';
import commentReducer from './features/comment/commentSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    comment: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
