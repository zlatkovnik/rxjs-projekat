import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/auth.reducer';
import { Store, select } from '@ngrx/store';
import { authError, authLoading } from '../../store/auth.selector';
import { registerUser, registerUserFailure } from '../../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  error$: Observable<any>;
  loading$: Observable<boolean>;

  get email() {
    return this.userForm.get('email');
  }
  get username() {
    return this.userForm.get('username');
  }
  get password() {
    return this.userForm.get('password');
  }

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
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
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.store.dispatch(registerUserFailure({ error: 'Form is not valid' }));
      return;
    }
    this.store.dispatch(
      registerUser({
        userRegister: {
          email: this.email.value,
          username: this.username.value,
          password: this.password.value,
        },
      })
    );
  }
}
