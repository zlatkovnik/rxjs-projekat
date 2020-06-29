import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostState } from '../../store/post.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import Post from '../../models/post.model';
import {
  loadPosts,
  updatePost,
  setPostsCount,
  cleanUpPosts,
} from '../../store/post.actions';
import {
  selectPosts,
  selectPostsError,
  selectPostsLoading,
  selectPostsCount,
} from '../../store/post.selectors';
import { Router, ActivatedRoute } from '@angular/router';
import Auth from 'src/app/auth/models/auth.model';
import { selectAuthUser } from 'src/app/auth/store/auth.selector';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import { PageEvent } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  page: number;
  pageSize: number = 5;
  pageEvent: PageEvent;

  posts$: Observable<Post[]>;
  postsCount$: Observable<number>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  auth$: Observable<Auth>;

  //Ovako sam uradio jer mi je prettier pravio problem u html-u
  postsCount: number;

  constructor(
    private postsStore: Store<PostState>,
    private authStore: Store<AuthState>,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const page = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadPosts(page);
    this.error$ = this.postsStore.pipe(select(selectPostsError));
    this.loading$ = this.postsStore.pipe(select(selectPostsLoading));
    this.auth$ = this.authStore.pipe(select(selectAuthUser));
  }

  loadPosts(page: number) {
    this.page = page;
    this.postsStore.dispatch(
      loadPosts({ page: this.page, postsPerPage: this.pageSize })
    );
    this.postsStore.dispatch(setPostsCount());
    this.posts$ = this.postsStore.pipe(select(selectPosts));
    this.postsCount$ = this.postsStore.pipe(select(selectPostsCount));
    this.postsCount$.pipe(take(1)).subscribe((c) => (this.postsCount = c));
  }

  changePage(event?: PageEvent): PageEvent {
    const page = event.pageIndex + 1;
    this.location.replaceState(`posts/list/page/${page}`);
    this.loadPosts(page);
    return event;
  }
}
