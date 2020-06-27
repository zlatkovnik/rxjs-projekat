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

@Injectable()
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
              posts: posts.body,
              postsCount: posts.headers.get('X-Total-Count'),
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
          postedBy: action.user.username,
          date: new Date().toISOString(),
          comments: [],
        };
        return this.postsService.createPost(post).pipe(
          map((post) => fromPostActions.addPostSuccess({ post })),
          catchError((error) => of(fromPostActions.addPostFailure({ error })))
        );
      }),
      tap(() => this.router.navigate(['/posts/list']))
    )
  );

  editPost$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromPostActions.editPost),
        concatMap((action) => {
          return this.postsService.editPost(
            action.post.id,
            action.post.changes
          );
        })
      ),
    { dispatch: false }
  );

  likePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.likePost),
      concatMap((action) => {
        const model = { ...action.post };
        if (model.likedBy.includes(action.user.id))
          model.likedBy = model.likedBy.filter((id) => action.user.id !== id);
        else model.likedBy = [...model.likedBy, action.user.id];
        const update: Update<Post> = { id: model.id, changes: model };
        return this.postsService
          .editPost(update.id, update.changes)
          .pipe(map(() => fromPostActions.editPost({ post: update })));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private router: Router
  ) {}
}
