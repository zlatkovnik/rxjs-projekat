import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { selectUsername } from 'src/app/store';
import { UserService } from '../../services/user.service';
import { logoutUser } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.username$ = this.store.pipe(select(selectUsername));
  }

  onLogout() {
    this.store.dispatch(logoutUser());
  }
}
