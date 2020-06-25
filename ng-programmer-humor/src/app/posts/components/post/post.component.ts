import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { UsersService } from 'src/app/users/service/users.service';
import Post from '../../models/post.model';
import Auth from 'src/app/auth/models/auth.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() user: Auth;
  @Output() like: EventEmitter<{
    postId: number;
    userId: number;
  }> = new EventEmitter();
  profileImageUrl$: Observable<string>;
  momentTime: string;
  hasLiked: boolean;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.profileImageUrl$ = this.usersService.getUserProfileImageUrl(
      this.post.postedBy
    );
    this.momentTime = moment(this.post.date).fromNow();
    this.hasLiked = this.post.likedBy.includes(this.user.id);
  }

  onLike() {
    this.hasLiked = !this.hasLiked;
    this.like.emit({ postId: this.post.id, userId: this.user.id });
  }
}
