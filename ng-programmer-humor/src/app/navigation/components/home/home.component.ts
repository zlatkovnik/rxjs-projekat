import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import { selectAuthUser } from 'src/app/auth/store/auth.selector';
import Auth from 'src/app/auth/models/auth.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username$: Observable<Auth>;

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.username$ = this.store.pipe(select(selectAuthUser));
  }
}
