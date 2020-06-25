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

  editPost(postId: number | string, changes: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(this.baseUrl + postId, changes);
  }

  // likePost(postId: number, userId: number): Observable<Post> {
  //   return this.getPost(postId).pipe(
  //     map((post) => {
  //       let likedBy = post.likedBy;
  //       if (likedBy.includes(userId)) {
  //         likedBy = likedBy.filter((id) => id !== userId);
  //       } else {
  //         likedBy.push(userId);
  //       }
  //       return { ...post, likedBy: likedBy };
  //     })
  //   );
  // }
}
