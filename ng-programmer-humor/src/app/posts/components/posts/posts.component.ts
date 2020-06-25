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
}
