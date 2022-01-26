import { configureStore } from '@reduxjs/toolkit';
import postsSlice from '../features/posts/postsSlice';
import redditSlice from '../features/reddit/redditSlice';

export const store = configureStore({
  reducer: {
    redditSlice: redditSlice,
    postsSlice: postsSlice,
  },
});
