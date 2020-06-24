import { Injectable } from '@angular/core';
import Auth from '../models/auth.model';
import { AuthState } from '../store/auth.reducer';
import { Store } from '@ngrx/store';
import { setUser } from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class InitServiceService {
  constructor(private store: Store<AuthState>) {}

  init(): Promise<any> {
    return new Promise<any>((res) => {
      const authJson = window.localStorage.getItem('AUTH');
      const auth = JSON.parse(authJson);
      if (!auth) res('not_logged');
      this.store.dispatch(setUser({ auth: auth }));
      res('ok');
    });
  }
}
