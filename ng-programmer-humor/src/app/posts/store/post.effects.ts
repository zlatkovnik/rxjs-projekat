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

@Injectable()
//@ts-ignore
export class PostEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.loadPosts),
      mergeMap((action) =>
        this.postsService.getPosts(action.page, action.postsPerPage).pipe(
          map((posts) => {
            //Get posts mora da vrati ceo response
            //Da bi iz headera izvukao broj postova
            //Koji su mi potrebni zbog stranica
            return fromPostActions.loadPostsSuccess({
              posts: posts,
              // postsCount: posts.headers.get('X-Total-Count'),
              postsCount: 20,
            });
          }),
          catchError((error) =>
            of(
              fromPostActions.loadPostsFailure({
                error: 'Connection timed out',
              })
            )
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
            of(fromPostActions.loadPostFailure({ error: error }))
          )
        )
      )
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.addPost),
      mergeMap((action) => {
        const post: Post = {
          title: action.title,
          imageURL: action.imageURL,
          likedBy: [action.user.id],
          postedBy: action.user,
          date: new Date().toISOString(),
          // comments: [],
        };
        return this.postsService.createPost(post).pipe(
          map((post) => fromPostActions.addPostSuccess({ post })),
          catchError((error) => of(fromPostActions.addPostFailure({ error })))
        );
      }),
      tap(() => this.router.navigate(['/posts/list']))
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
