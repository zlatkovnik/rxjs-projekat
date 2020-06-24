import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../store/auth.reducer';
import { authError, authLoading, authMessage } from '../../store/auth.selector';
import { loginUserFailure, loginUser } from '../../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  message$: Observable<string>;

  get username() {
    return this.userForm.get('username');
  }
  get password() {
    return this.userForm.get('password');
  }

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.error$ = this.store.pipe(select(authError));
    this.loading$ = this.store.pipe(select(authLoading));
    this.message$ = this.store.pipe(select(authMessage));
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.store.dispatch(loginUserFailure({ error: 'Form is not valid' }));
      return;
    }
    this.store.dispatch(
      loginUser({
        userLogin: {
          username: this.username.value,
          password: this.password.value,
        },
      })
    );
  }
}
