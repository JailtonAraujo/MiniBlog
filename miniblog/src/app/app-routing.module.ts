import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPostComponent } from './components/post-module/edit-post/edit-post.component';
import { NewPostComponent } from './components/post-module/new-post/new-post.component';
import { AboutComponent } from './pages/about/about.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'about', component: AboutComponent},
  {path:'cadastrar', component: CadastrarComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'post/newpost', component: NewPostComponent},
  {path:'post/editpost/:id', component: EditPostComponent},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
