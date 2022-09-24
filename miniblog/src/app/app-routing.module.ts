import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPostComponent } from './components/post-module/edit-post/edit-post.component';
import { NewPostComponent } from './components/post-module/new-post/new-post.component';
import { ReadPostComponent } from './components/post-module/read-post/read-post.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
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
  {path:'dashboard', component: DashboardComponent,canActivate:[AuthGuardGuard]},
  {path:'post/newpost', component: NewPostComponent,canActivate:[AuthGuardGuard]},
  {path:'post/editpost/:id', component: EditPostComponent,canActivate:[AuthGuardGuard]},
  {path:'post/read/:id', component:ReadPostComponent},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
