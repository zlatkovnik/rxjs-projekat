import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  selectedPost,
  selectPostsLoading,
  selectPostsError,
} from '../../store/post.selectors';
import { loadPost, editComments } from '../../store/post.actions';
import { PostState } from '../../store/post.reducer';
import { Observable } from 'rxjs';
import { selectAuthUser } from 'src/app/auth/store/auth.selector';
import Post from '../../models/post.model';
import Auth from 'src/app/auth/models/auth.model';
import Comment from '../../models/comment.model';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });

  get comment() {
    return this.commentForm.get('comment');
  }

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

  onSubmitComment() {
    this.auth$.pipe(take(1)).subscribe((auth) => {
      const user = auth;
      this.post$.pipe(take(1)).subscribe((post) => {
        const comment: Comment = {
          commentedBy: user.username,
          body: this.comment.value,
        };
        const postModel: Post = {
          ...post,
          comments: [comment, ...post.comments],
        };
        this.postsStore.dispatch(editComments({ user: user, post: postModel }));
        this.commentForm.reset();
      });
    });
  }

  onDeleteComment(comment: Comment) {
    this.auth$.pipe(take(1)).subscribe((auth) => {
      const user = auth;
      this.post$.pipe(take(1)).subscribe((post) => {
        const postModel: Post = {
          ...post,
          comments: post.comments.filter((com) => {
            if (
              !(com.body === comment.body && com.commentedBy === auth.username)
            )
              return com;
          }),
        };
        this.postsStore.dispatch(editComments({ user: user, post: postModel }));
      });
    });
  }
}
