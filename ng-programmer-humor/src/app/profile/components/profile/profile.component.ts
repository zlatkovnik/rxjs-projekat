import { Component, OnInit } from '@angular/core';
import { ProfileState } from '../../store/profile.reducer';
import { Store, select } from '@ngrx/store';
import { loadProfile } from '../../store/profile.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  selectedProfile,
  selectedProfileLoading,
  selectedProfileError,
} from '../../store/profile.selector';
import Profile from '../../models/profile.model';
import Auth from 'src/app/auth/models/auth.model';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import {
  selectAuthUser,
  selectAuthLoading,
  selectAuthError,
} from 'src/app/auth/store/auth.selector';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { updateProfileImage } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile$: Observable<Profile>;
  auth$: Observable<Auth>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  tempProfileImage: string;
  loadingImageChange$: Observable<boolean>;
  errorImageChange$: Observable<any>;

  profileForm = new FormGroup({
    url: new FormControl(''),
  });

  get url() {
    return this.profileForm.get('url');
  }

  constructor(
    private profileStore: Store<ProfileState>,
    private authStore: Store<AuthState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.profileStore.dispatch(
      loadProfile({ id: parseInt(this.route.snapshot.paramMap.get('id')) })
    );
    this.profile$ = this.profileStore.pipe(select(selectedProfile));
    this.auth$ = this.authStore.pipe(select(selectAuthUser));
    this.tempProfileImage =
      'https://image.freepik.com/free-vector/glitch-error-404-page-background_23-2148072533.jpg';
    this.loading$ = this.profileStore.pipe(select(selectedProfileLoading));
    this.error$ = this.profileStore.pipe(select(selectedProfileError));

    this.loadingImageChange$ = this.authStore.pipe(select(selectAuthLoading));
    this.errorImageChange$ = this.authStore.pipe(select(selectAuthError));
  }

  imagePreview() {
    const img = new Image();
    img.src = this.url.value;
    img.onload = () => {
      this.tempProfileImage = this.url.value;
    };
    img.onerror = () => {
      this.tempProfileImage =
        'https://image.freepik.com/free-vector/glitch-error-404-page-background_23-2148072533.jpg';
    };
  }

  onSubmit() {
    this.auth$.subscribe((auth) => {
      this.authStore.dispatch(
        updateProfileImage({ userId: auth.id, url: this.tempProfileImage })
      );
    });
  }
}
