import { Component, OnInit, Input } from '@angular/core';
import Post from 'src/app/models/models.post';

import * as moment from 'moment';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  momentDate: string;
  profileImage$: Observable<string>;
  profileImage: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.momentDate = moment(this.post.date).fromNow();
    this.profileImage$ = this.userService.getProfileImage(this.post.postedBy);
    this.profileImage$.subscribe((url) => (this.profileImage = url));
  }
}
