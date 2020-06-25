import { Component, OnInit } from '@angular/core';
import { PostState } from '../../store/post.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import Post from '../../models/post.model';
import { loadPosts, updatePost } from '../../store/post.actions';
import {
  selectPosts,
  selectPostsError,
  selectPostsLoading,
} from '../../store/post.selectors';
import { Router } from '@angular/router';
import Auth from 'src/app/auth/models/auth.model';
import { selectAuthUser } from 'src/app/auth/store/auth.selector';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  auth$: Observable<Auth>;

  constructor(
    private postsStore: Store<PostState>,
    private authStore: Store<AuthState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postsStore.dispatch(loadPosts());
    this.posts$ = this.postsStore.pipe(select(selectPosts));
    this.error$ = this.postsStore.pipe(select(selectPostsError));
    this.loading$ = this.postsStore.pipe(select(selectPostsLoading));
    this.auth$ = this.authStore.pipe(select(selectAuthUser));
  }

  getLikeEmitted({ postId, userId }) {
    this.posts$.subscribe((posts) => {
      const post = posts.find((post) => post.id === postId);
      const model = { ...post };
      if (post.likedBy.includes(userId))
        model.likedBy = post.likedBy.filter((id) => userId != id);
      else model.likedBy = [post.likedBy, userId];
      const update: Update<Post> = { id: post.id, changes: model };
      this.postsStore.dispatch(updatePost({ post: update }));
    });
  }
}
