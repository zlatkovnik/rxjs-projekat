import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, State, select } from '@ngrx/store';
import { loginUser } from 'src/app/store/user/user.actions';
import { selectUsername } from '../../store/index';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/store/user/user.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  error = '';
  loading = false;

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store
  ) {}

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
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.error = 'Form is not valid';
      return;
    }
    this.loading = true;
    this.userService.login(this.username.value, this.password.value).subscribe(
      (user) => {
        this.loading = false;
        this.store.dispatch(loginUser({ username: this.username.value }));
        this.router.navigate(['/']);
      },
      (err) => {
        this.error = err;
        this.loading = false;
      }
    );
  }
}
