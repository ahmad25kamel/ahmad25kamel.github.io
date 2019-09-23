import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:"",loadChildren:"./pages/home/home.module#HomeModule"},
  {path:"about",loadChildren:"./pages/about/about.module#AboutModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
