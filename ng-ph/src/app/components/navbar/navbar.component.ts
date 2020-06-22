import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { fromUser, AppState } from 'src/app/store';
import { logoutUser, loginUser } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    //@ts-ignore
    this.username$ = this.store.select((state) => state.user.username);
  }

  onLogout() {
    this.store.dispatch(logoutUser());
  }
}
