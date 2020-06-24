import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  //   { path: "get/:id", component: ProductComponent },
  //   { path: "add", component: ProductAddComponent },
  //   { path: "edit/:id", component: ProductEditComponent },
  { path: '', component: PostsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
