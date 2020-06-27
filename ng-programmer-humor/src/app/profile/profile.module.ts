import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersRoutingModule } from './profile-routing.module';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import * as fromProfile from './store/profile.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './store/profile.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(fromProfile.profilesFeatureKey, fromProfile.reducer),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  exports: [ProfileComponent],
})
export class UsersModule {}
