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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile$: Observable<Profile>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(
    private profileStore: Store<ProfileState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.profileStore.dispatch(
      loadProfile({ id: parseInt(this.route.snapshot.paramMap.get('id')) })
    );
    this.profile$ = this.profileStore.pipe(select(selectedProfile));
    this.loading$ = this.profileStore.pipe(select(selectedProfileLoading));
    this.error$ = this.profileStore.pipe(select(selectedProfileError));
  }
}
