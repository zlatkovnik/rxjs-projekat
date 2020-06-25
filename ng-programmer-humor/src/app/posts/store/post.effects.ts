import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import * as fromPostActions from './post.actions';
import { PostsService } from '../services/posts.service';
import { of } from 'rxjs';

@Injectable()
export class PostEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.loadPosts),
      mergeMap((action) =>
        this.postsService.getPosts().pipe(
          map((posts) => fromPostActions.loadPostsSuccess({ posts: posts })),
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

  editPost$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromPostActions.editPost),
        concatMap((action) =>
          this.postsService.editPost(action.post.id, action.post.changes)
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
