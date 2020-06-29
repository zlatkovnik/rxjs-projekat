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
import Profile from 'src/app/profile/models/profile.model';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import { setKarma } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() user: Profile;
  momentTime: string;
  hasLiked: boolean;

  constructor(
    private profileService: ProfileService,
    private authStore: Store<AuthState>,
    private postsStore: Store<PostState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.momentTime = moment(this.post.date).fromNow();
    this.hasLiked = this.post.likedBy.includes(this.user.id);
  }

  onLike() {
    const point = this.hasLiked ? -1 : 1;
    this.profileService
      .changeKarma(this.post.postedBy.id, point)
      .subscribe(() => {
        if (this.user.id === this.post.postedBy.id) {
          const model: Auth = { ...this.user, karma: this.user.karma + point };
          this.authStore.dispatch(setKarma({ user: model }));
        }

        this.postsStore.dispatch(
          likePost({ user: this.user, post: this.post })
        );
      });
    this.hasLiked = !this.hasLiked;
  }

  onProfileClick() {
    this.router.navigate([`/profile/view/${this.post.postedBy.id}`]);
  }
}
