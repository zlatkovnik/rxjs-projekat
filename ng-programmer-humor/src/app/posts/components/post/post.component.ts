import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ProfileService } from '../../../profile/service/profile.service';
import Post from '../../models/post.model';
import Auth from 'src/app/auth/models/auth.model';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { PostState } from '../../store/post.reducer';
import { editPost, likePost } from '../../store/post.actions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() user: Auth;
  profileImageUrl$: Observable<string>;
  momentTime: string;
  hasLiked: boolean;

  constructor(
    private profileService: ProfileService,
    private postsStore: Store<PostState>
  ) {}

  ngOnInit(): void {
    this.profileImageUrl$ = this.profileService.getUserProfileImageUrl(
      this.post.postedBy
    );
    this.momentTime = moment(this.post.date).fromNow();
    this.hasLiked = this.post.likedBy.includes(this.user.id);
  }

  onLike() {
    this.postsStore.dispatch(likePost({ user: this.user, post: this.post }));
    this.hasLiked = !this.hasLiked;
  }
}
