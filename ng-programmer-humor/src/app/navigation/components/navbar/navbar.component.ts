import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Auth from 'src/app/auth/models/auth.model';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import { Store, select } from '@ngrx/store';
import { selectAuthUser } from 'src/app/auth/store/auth.selector';
import { logoutUser } from 'src/app/auth/store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user$: Observable<Auth>;

  constructor(private store: Store<AuthState>, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(selectAuthUser));
  }

  onProfile(id: number): void {
    this.router.navigate([`/profile/view/${id}`]);
  }

  onLogout() {
    this.store.dispatch(logoutUser());
  }
}
