import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Post from '../models/models.post';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseURL = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get<Post[]>(this.baseURL);
  }

  postPost(post: Post) {
    return this.http.post<Post>(this.baseURL, post);
  }
}
