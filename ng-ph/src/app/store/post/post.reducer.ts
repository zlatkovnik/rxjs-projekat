import { Action, createReducer, on } from '@ngrx/store';
import Post from 'src/app/models/models.post';
import { loadPosts } from './post.actions';
import { state } from '@angular/animations';

export const postFeatureKey = 'post';

export interface PostState {
  posts: Post[];
}

export const initialState: PostState = {
  posts: [],
};

export const reducer = createReducer(
  initialState
  // on(loadPosts, (state) => {...state, posts: post})
);
