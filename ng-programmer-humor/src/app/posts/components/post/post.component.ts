import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { UsersService } from 'src/app/users/service/users.service';
import Post from '../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  profileImageUrl$: Observable<string>;
  momentTime: string;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.profileImageUrl$ = this.usersService.getUserProfileImageUrl(
      this.post.postedBy
    );
    this.momentTime = moment(this.post.date).fromNow();
  }
}
