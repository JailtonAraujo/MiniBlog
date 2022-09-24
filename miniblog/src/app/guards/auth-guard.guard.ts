import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  userLogado:any
  constructor(private auth:UserService,
    private messageService:MessageService,
    private router:Router){

  }

  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.userLogado = this.auth.getUserLogado();

    if(this.userLogado){
      return true;
    }else{
      this.messageService.addMessage('alert-danger','Por favor faça login!');
      this.router.navigate(['login']);
      return false;
    }    

  }
  
}
