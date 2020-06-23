import { Component, OnInit } from '@angular/core';
import { PostState } from '../../store/post.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import Post from '../../models/post.model';
import { loadPosts } from '../../store/post.actions';
import { selectPosts } from '../../store/post.selectors';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private store: Store<PostState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
    this.posts$ = this.store.pipe(select(selectPosts));
  }
}
