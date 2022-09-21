import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'about', component: AboutComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
