import { Action, createReducer, on } from '@ngrx/store';
import Post from 'src/app/models/models.post';
import {
  loadPosts,
  successfulLoadPosts,
  errorLoadPosts,
  createPost,
  successfulCreatePost,
  errorCreatePost,
  deletePost,
  successfulDeletePost,
  errorDeletePost,
} from './post.actions';

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string;
}

export const initialState: PostState = {
  posts: [],
  loading: false,
  error: '',
};

export const postReducer = createReducer(
  initialState,
  on(loadPosts, (state) => ({ ...state, loading: true })),
  on(successfulLoadPosts, (state, { posts }) => ({
    ...state,
    loading: false,
    error: '',
    posts: posts,
  })),
  on(errorLoadPosts, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(createPost, (state) => ({ ...state, loading: true })),
  on(successfulCreatePost, (state, { post }) => ({
    ...state,
    loading: false,
    error: '',
    posts: [...state.posts, post],
  })),
  on(errorCreatePost, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(deletePost, (state) => ({ ...state, loading: true })),
  on(successfulDeletePost, (state, { postId }) => ({
    ...state,
    loading: false,
    error: '',
    posts: state.posts.filter((post, i) => i !== postId),
  })),
  on(errorDeletePost, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  }))
);
