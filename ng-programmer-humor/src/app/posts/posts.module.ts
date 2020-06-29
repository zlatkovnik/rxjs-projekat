import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsComponent } from './components/posts/posts.component';
import { StoreModule } from '@ngrx/store';
import * as fromPost from './store/post.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/post.effects';
import { PostComponent } from './components/post/post.component';
import { PostsRoutingModule } from './posts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostAddComponent } from './components/post-add/post-add.component';

//MUI
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    PostAddComponent,
    PostDetailComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatListModule,
    StoreModule.forFeature(fromPost.postsFeatureKey, fromPost.reducer),
    EffectsModule.forFeature([PostEffects]),
  ],
  exports: [PostsComponent, PostAddComponent, PostDetailComponent],
})
export class PostsModule {}
