import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Auth from 'src/app/auth/models/auth.model';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import { Store, select } from '@ngrx/store';
import {
  selectUserState,
  authUser,
  authLoading,
  authError,
} from 'src/app/auth/store/auth.selector';
import { UsersService } from 'src/app/users/service/users.service';
import { logoutUser } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user$: Observable<Auth>;

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(authUser));
  }

  onLogout() {
    this.store.dispatch(logoutUser());
  }
}
