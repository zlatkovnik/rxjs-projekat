import { Component, OnInit, Input } from '@angular/core';
import Post from 'src/app/models/models.post';

import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  momentDate: string;

  constructor() {}

  ngOnInit(): void {
    this.momentDate = moment(this.post.date).fromNow();
  }
}
