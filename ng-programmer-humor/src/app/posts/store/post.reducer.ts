import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as PostActions from './post.actions';
import Post from '../models/post.model';

export const postsFeatureKey = 'posts';

export interface PostState extends EntityState<Post> {
  error: any;
  selectedPost: Post;
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialState: PostState = adapter.getInitialState({
  error: undefined,
  selectedPost: undefined,
});

export const reducer = createReducer(
  initialState,
  on(PostActions.loadPostsSuccess, (state, action) =>
    adapter.setAll(action.posts, state)
  ),
  on(PostActions.loadPostsFailure, (state, action) => {
    return { ...state, error: action.error };
  }),
  on(PostActions.loadPostSuccess, (state, action) => {
    return { ...state, error: '', selectedPost: action.post };
  }),
  on(PostActions.loadPostFailure, (state, action) => {
    return { ...state, error: action.error };
  }),
  on(PostActions.addPost, (state, action) =>
    adapter.addOne(action.post, state)
  ),
  on(PostActions.upsertPost, (state, action) =>
    adapter.upsertOne(action.post, state)
  ),
  on(PostActions.addPosts, (state, action) =>
    adapter.addMany(action.posts, state)
  ),
  on(PostActions.upsertPosts, (state, action) =>
    adapter.upsertMany(action.posts, state)
  ),
  on(PostActions.updatePost, (state, action) =>
    adapter.updateOne(action.post, state)
  ),
  on(PostActions.updatePosts, (state, action) =>
    adapter.updateMany(action.posts, state)
  ),
  on(PostActions.deletePost, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(PostActions.deletePosts, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),

  on(PostActions.clearPosts, (state) => adapter.removeAll(state))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
