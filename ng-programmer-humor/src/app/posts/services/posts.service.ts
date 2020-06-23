import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Post from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/posts/';

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(this.baseUrl + postId);
  }

  deletePost(postId: number) {
    return this.http.delete(this.baseUrl + postId);
  }
}
