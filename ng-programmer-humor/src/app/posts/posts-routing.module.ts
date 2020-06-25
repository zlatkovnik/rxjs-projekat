import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PostAddComponent } from './components/post-add/post-add.component';

const routes: Routes = [
  //   { path: "get/:id", component: ProductComponent },
  { path: 'add', component: PostAddComponent },
  //   { path: "edit/:id", component: ProductEditComponent },
  { path: 'list', component: PostsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
