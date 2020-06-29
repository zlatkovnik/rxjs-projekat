import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import * as fromPostActions from './post.actions';
import { PostsService } from '../services/posts.service';
import { of, concat, Observable } from 'rxjs';
import Post from '../models/post.model';
import { Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { dispatch } from 'rxjs/internal/observable/pairs';
import PostDTO from '../models/postDTO.model';
import { PostDetailComponent } from '../components/post-detail/post-detail.component';
import { ProfileService } from 'src/app/profile/service/profile.service';

@Injectable()
//@ts-ignore
export class PostEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.loadPosts),
      mergeMap((action) =>
        this.postsService.getPosts(action.page, action.postsPerPage).pipe(
          map((posts) => {
            return fromPostActions.loadPostsSuccess({
              posts: posts,
            });
          }),
          catchError((error) =>
            of(
              fromPostActions.loadPostsFailure({
                error: 'Connection timed out' + error.message,
              })
            )
          )
        )
      )
    )
  );

  setPostCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.setPostsCount),
      mergeMap((action) =>
        this.postsService.getPostsCount().pipe(
          map((res) =>
            fromPostActions.setPostsCountSucces({
              postsCount: res.headers.get('X-Total-Count'),
            })
          )
        )
      )
    )
  );

  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.loadPost),
      mergeMap((action) =>
        this.postsService.getPost(action.id).pipe(
          map((post) => fromPostActions.loadPostSuccess({ post: post })),
          catchError((error) =>
            of(fromPostActions.loadPostFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.addPost),
      mergeMap((action) => {
        const model: Post = {
          title: action.title,
          imageURL: action.imageURL,
          likedBy: [action.user.id],
          postedBy: action.user,
          date: new Date().toISOString(),
          comments: [],
        };
        return this.postsService.createPost(model).pipe(
          map((post) => fromPostActions.addPostSuccess({ post: model })),
          catchError((error) =>
            of(fromPostActions.addPostFailure({ error: error.message }))
          )
        );
      }),
      tap(() => this.router.navigate(['/posts/list/page/1']))
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.deletePost),
      mergeMap((action) =>
        this.postsService.deletePost(action.id).pipe(
          map(() => fromPostActions.deletePostSuccess({ id: action.id })),
          catchError((error) =>
            of(fromPostActions.deletePostFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // editPost$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(fromPostActions.editPost),
  //       concatMap((action) => {
  //         return this.postsService.editPost(
  //           action.post.id,
  //           action.post.changes
  //         );
  //       })
  //     ),
  //   { dispatch: false }
  // );

  likePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.likePost),
      concatMap((action) => {
        const postModel: Partial<Post> = {
          likedBy: action.post.likedBy,
          id: action.post.id,
        };
        if (postModel.likedBy.includes(action.user.id))
          postModel.likedBy = postModel.likedBy.filter(
            (id) => action.user.id !== id
          );
        else postModel.likedBy = [...postModel.likedBy, action.user.id];

        const postDTOModel: Partial<PostDTO> = {
          likedBy: postModel.likedBy,
          id: postModel.id,
        };
        const updatePost: Update<Post> = {
          id: postModel.id,
          changes: postModel,
        };
        const updatePostDTO: Update<PostDTO> = {
          id: postDTOModel.id,
          changes: postDTOModel,
        };
        return this.postsService
          .editPost(updatePostDTO.id, updatePostDTO.changes)
          .pipe(map(() => fromPostActions.editPost({ post: updatePost })));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private router: Router
  ) {}
}
