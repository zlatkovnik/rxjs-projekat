import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Store, select } from '@ngrx/store';
import { PostState } from '../../store/post.reducer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  selectPostsError,
  selectPostsLoading,
} from '../../store/post.selectors';
import { addPost, addPostFailure } from '../../store/post.actions';
import Auth from 'src/app/auth/models/auth.model';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import { selectAuthUser } from 'src/app/auth/store/auth.selector';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css'],
})
export class PostAddComponent implements OnInit {
  postForm: FormGroup;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  user$: Observable<Auth>;
  user: Auth;

  get title() {
    return this.postForm.get('title');
  }
  get imageURL() {
    return this.postForm.get('imageURL');
  }

  constructor(
    private postsStore: Store<PostState>,
    private authStore: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      imageURL: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    this.error$ = this.postsStore.pipe(select(selectPostsError));
    this.loading$ = this.postsStore.pipe(select(selectPostsLoading));
    this.user$ = this.authStore.pipe(select(selectAuthUser));
    this.user$.subscribe((auth) => (this.user = auth));
  }

  onSubmit() {
    if (!this.postForm.valid) {
      this.postsStore.dispatch(addPostFailure({ error: 'Form is not valid' }));
      return;
    }
    this.postsStore.dispatch(
      addPost({
        title: this.title.value,
        imageURL: this.imageURL.value,
        user: this.user,
      })
    );
  }
}
