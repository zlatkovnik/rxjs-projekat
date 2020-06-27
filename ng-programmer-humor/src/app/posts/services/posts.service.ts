import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Post from '../models/post.model';
import { Observable } from 'rxjs';
import { postsFeatureKey } from '../store/post.reducer';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/posts';

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post);
  }

  getPosts(page: number, itemsPerPage: number): Observable<any> {
    return this.http.get<Post[]>(
      `${this.baseUrl}?_sort=date&_order=desc&_page=${page}&_limit=${itemsPerPage}`,
      { observe: 'response' }
    );
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${postId}`);
  }

  deletePost(postId: number) {
    return this.http.delete(`${this.baseUrl}/${postId}`);
  }

  editPost(postId: number | string, changes: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${postId}`, changes);
  }
}
