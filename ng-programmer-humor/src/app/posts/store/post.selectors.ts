import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState, postsFeatureKey, selectAll } from './post.reducer';

export const selectPostState = createFeatureSelector<PostState>(
  postsFeatureKey
);

export const selectPosts = createSelector(selectPostState, selectAll);
export const selectedPost = createSelector(
  selectPostState,
  (state: PostState) => state.selectedPost
);
