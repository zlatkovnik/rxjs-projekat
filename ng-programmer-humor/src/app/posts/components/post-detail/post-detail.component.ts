import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  selectedPost,
  selectPostsLoading,
  selectPostsError,
} from '../../store/post.selectors';
import { loadPost } from '../../store/post.actions';
import { PostState } from '../../store/post.reducer';
import { Observable } from 'rxjs';
import { selectAuthUser } from 'src/app/auth/store/auth.selector';
import Post from '../../models/post.model';
import Auth from 'src/app/auth/models/auth.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post$: Observable<Post>;
  auth$: Observable<Auth>;
  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(
    private postsStore: Store<PostState>,
    private userStore: Store<Auth>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postsStore.dispatch(
      loadPost({ id: parseInt(this.route.snapshot.paramMap.get('id')) })
    );
    this.post$ = this.postsStore.pipe(select(selectedPost));
    this.auth$ = this.userStore.pipe(select(selectAuthUser));
    this.error$ = this.postsStore.pipe(select(selectPostsError));
    this.loading$ = this.postsStore.pipe(select(selectPostsLoading));
  }
}
