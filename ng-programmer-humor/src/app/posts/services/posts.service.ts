import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Post from '../models/post.model';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map, take, tap } from 'rxjs/operators';
import PostDTO from '../models/postDTO.model';
import { ProfileService } from '../../profile/service/profile.service';

@Injectable({
  providedIn: 'root',
})
//@ts-ignore
export class PostsService {
  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) {}

  baseUrl: string = 'http://localhost:3000/posts';

  createPost(post: Post): Observable<PostDTO> {
    const postDTO: PostDTO = { ...post, postedBy: post.postedBy.id };
    return this.http.post<PostDTO>(this.baseUrl, postDTO);
  }

  getPostsDTO(page: number, itemsPerPage: number): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(
      `${this.baseUrl}?_sort=date&_order=desc&_page=${page}&_limit=${itemsPerPage}`
    );
  }

  getPostsCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?_page=1&_limit=1`, {
      observe: 'response',
    });
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${postId}`);
  }

  deletePost(postId: number) {
    return this.http.delete<PostDTO>(`${this.baseUrl}/${postId}`);
  }

  editPost(
    postId: number | string,
    changes: Partial<PostDTO>
  ): Observable<PostDTO> {
    return this.http.patch<PostDTO>(`${this.baseUrl}/${postId}`, changes);
  }

  getPosts(page: number, itemsPerPage: number) {
    return this.getPostsDTO(page, itemsPerPage).pipe(
      switchMap((posts) => this.getPostsFromDTO(posts))
    );
  }

  getPostsFromDTO(postsDTO: PostDTO[]) {
    return forkJoin(postsDTO.map((post) => this.getPostFromDTO(post)));
  }

  getPostFromDTO(postDTO: PostDTO) {
    return this.profileService.getUser(postDTO.postedBy).pipe(
      take(1),
      map((profile) => {
        const model: Post = { ...postDTO, postedBy: profile };
        return model;
      })
    );
  }
}
