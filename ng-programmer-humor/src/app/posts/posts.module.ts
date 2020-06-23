import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsComponent } from './components/posts/posts.component';
import { StoreModule } from '@ngrx/store';
import * as fromPost from './store/post.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/post.effects';

//MUI
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [PostsComponent, PostComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,

    StoreModule.forFeature(fromPost.postsFeatureKey, fromPost.reducer),
    EffectsModule.forFeature([PostEffects]),
  ],
  exports: [PostsComponent],
})
export class PostsModule {}
