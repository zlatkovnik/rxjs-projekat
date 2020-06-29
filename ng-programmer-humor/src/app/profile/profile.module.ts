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
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(fromProfile.profilesFeatureKey, fromProfile.reducer),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  exports: [ProfileComponent],
})
export class UsersModule {}
