import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as PostActions from './post.actions';
import Post from '../models/post.model';
import { state } from '@angular/animations';

export const postsFeatureKey = 'posts';

export interface PostState extends EntityState<Post> {
  error: any;
  selectedPost: Post;
  loading: boolean;
  postsCount: number;
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialState: PostState = adapter.getInitialState({
  error: undefined,
  selectedPost: undefined,
  loading: false,
  postsCount: 0,
});

export const reducer = createReducer(
  initialState,
  on(PostActions.loadPosts, (state, action) => {
    return { ...state, loading: true };
  }),
  on(PostActions.setPostsCount, (state, action) => {
    return { ...state };
  }),
  on(PostActions.setPostsCountSucces, (state, action) => {
    return { ...state, postsCount: action.postsCount };
  }),
  on(PostActions.loadPostsSuccess, (state, action) =>
    adapter.setAll(action.posts, {
      ...state,
      loading: false,
      error: undefined,
    })
  ),
  on(PostActions.loadPostsFailure, (state, action) => {
    return { ...state, error: action.error, loading: false };
  }),
  on(PostActions.loadPostSuccess, (state, action) => {
    return { ...state, error: '', selectedPost: action.post, loading: false };
  }),
  on(PostActions.loadPostFailure, (state, action) => {
    return { ...state, error: action.error, loading: false };
  }),
  on(PostActions.editPost, (state, action) =>
    adapter.updateOne(action.post, state)
  ),
  on(PostActions.addPost, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(PostActions.addPostSuccess, (state, action) =>
    adapter.addOne(action.post, { ...state, loading: false, error: undefined })
  ),
  on(PostActions.addPostFailure, (state, action) => {
    return { ...state, loading: false, error: action.error };
  }),
  on(PostActions.deletePost, (state, action) => {
    return { ...state, loading: true };
  }),
  on(PostActions.deletePostSuccess, (state, action) =>
    adapter.removeOne(action.id, { ...state, loading: false, error: undefined })
  ),
  on(PostActions.deletePostFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),
  on(PostActions.clearPosts, (state) => adapter.removeAll(state)),
  on(PostActions.cleanUpPosts, (state) => ({
    ...state,
    loading: false,
    error: undefined,
  }))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
