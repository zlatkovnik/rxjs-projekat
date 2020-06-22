import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Post from '../models/models.post';
import { tap, catchError } from 'rxjs/operators';
import { throwError, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseURL = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http
      .get<Post[]>(this.baseURL)
      .pipe(catchError((error) => throwError(`Request timed out`)));
  }

  postPost(post: Post) {
    return this.http
      .post<Post>(this.baseURL, post)
      .pipe(catchError((error) => throwError(`Request timed out`)));
  }
}
