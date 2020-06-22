import { createAction, props } from '@ngrx/store';
import Post from 'src/app/models/models.post';

export const loadPosts = createAction('[Post] Load Posts');

export const successfulLoadPosts = createAction(
  '[Post] Successful Load Posts',
  props<{ posts: Post[] }>()
);

export const errorLoadPosts = createAction(
  '[Post] Error Load Posts',
  props<{ error: string }>()
);

export const createPost = createAction(
  '[Post] Create Post',
  props<{ post: Post }>()
);

export const successfulCreatePost = createAction(
  '[Post] Successful Create Post',
  props<{ post: Post }>()
);

export const errorCreatePost = createAction(
  '[Post] Error Create Post',
  props<{ error: string }>()
);

export const deletePost = createAction(
  '[Post] Delete Post',
  props<{ postId: number }>()
);

export const successfulDeletePost = createAction(
  '[Post] Successful Delete Post',
  props<{ postId: number }>()
);

export const errorDeletePost = createAction(
  '[Post] Error Delete Post',
  props<{ error: string }>()
);
