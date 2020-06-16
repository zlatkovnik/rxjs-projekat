import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  error = '';
  loading = false;

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  constructor(private userService: UserService) {}

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
    this.loading = true;
    if (!this.userForm.valid) {
      this.error = 'Form is not valid';
      return;
    }
    this.userService
      .register(this.username.value, this.password.value)
      .subscribe(
        (user) => {
          console.log(user);
          this.loading = false;
        },
        (err) => {
          this.error = err;
          this.loading = false;
        }
      );
  }
}
