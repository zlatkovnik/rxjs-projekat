import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState, postsFeatureKey, selectAll } from './post.reducer';

export const selectPostState = createFeatureSelector<PostState>(
  postsFeatureKey
);

export const selectPosts = createSelector(selectPostState, selectAll);

export const selectPostsCount = createSelector(
  selectPostState,
  (state: PostState) => state.postsCount
);

export const selectedPost = createSelector(
  selectPostState,
  (state: PostState) => state.selectedPost
);
export const selectPostsError = createSelector(
  selectPostState,
  (state: PostState) => state.error
);
export const selectPostsLoading = createSelector(
  selectPostState,
  (state: PostState) => state.loading
);
