import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import Post from '../models/post.model';
import Auth from '../../auth/models/auth.model';
import PostDTO from '../models/postDTO.model';

//Loading posts
export const loadPosts = createAction(
  '[Post Component] Load Posts',
  props<{ page: number; postsPerPage: number }>()
);
export const setPostsCount = createAction('[Post Component] Set Post Count');
export const setPostsCountSucces = createAction(
  '[Post Effect] Set Posts Count Success',
  props<{ postsCount: number }>()
);
export const loadPostsSuccess = createAction(
  '[Post Effect] Load Posts Success',
  props<{ posts: Post[] }>()
);
export const loadPostsFailure = createAction(
  '[Post Effect] Load Posts Failure',
  props<{ error: any }>()
);
//Loading individual post
export const loadPost = createAction(
  '[Post Component] Load Post',
  props<{ id: number }>()
);
export const loadPostSuccess = createAction(
  '[Post Effect] Load Post Success',
  props<{ post: Post }>()
);
export const loadPostFailure = createAction(
  '[Post Effect] Load Post Failure',
  props<{ error: any }>()
);
//Edit single post
export const editPost = createAction(
  '[Post Component] Edit Post',
  props<{ post: Update<Post> }>()
);
//Like post
export const likePost = createAction(
  '[Post Component] Like Post',
  props<{ user: Auth; post: Post }>()
);
//Add comment
export const editComments = createAction(
  '[Post Component] Edit Comments',
  props<{ user: Auth; post: Post }>()
);
export const editCommentsSuccessful = createAction(
  '[Post Effect] Edit Comments Successful',
  props<{ post: Post }>()
);
export const editCommentsFailure = createAction(
  '[Post Effect] Edit Comments Failure',
  props<{ error: any }>()
);
//Add new post
export const addPost = createAction(
  '[Post Component] Add Post',
  props<{ title: string; imageURL: string; user: Auth }>()
);
export const addPostSuccess = createAction(
  '[Post Effect] Add Post Success',
  props<{ post: Post }>()
);
export const addPostFailure = createAction(
  '[Post Effect] Add Post Failure',
  props<{ error: any }>()
);
//Delete post
export const deletePost = createAction(
  '[Post Component] Delete Post',
  props<{ id: number }>()
);
export const deletePostSuccess = createAction(
  '[Post Effect] Delete Post Success',
  props<{ id: number }>()
);
export const deletePostFailure = createAction(
  '[Post Effect] Delete Post Failure',
  props<{ error: any }>()
);

export const clearPosts = createAction('[Post Component] Clear Posts');

export const cleanUpPosts = createAction('[Post Component] Clean Up Posts');

export const noopActionPost = createAction('[Post Effect] Noop Action Post');
