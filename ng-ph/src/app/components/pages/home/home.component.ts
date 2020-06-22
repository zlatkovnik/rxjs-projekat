import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromUser } from 'src/app/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.username$ = this.store.select(fromUser.getStateUsername);
  }
}
