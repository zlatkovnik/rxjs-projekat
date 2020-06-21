import { createAction, props } from '@ngrx/store';
import Post from 'src/app/models/models.post';

export const loadPosts = createAction('[Post] Load Posts');

export const createPost = createAction(
  '[Post] Create Post',
  props<{ post: Post }>()
);

export const deletePost = createAction(
  '[Post] Delete Post',
  props<{ postId: number }>()
);
