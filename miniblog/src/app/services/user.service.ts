import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLogado:BehaviorSubject<boolean> = new BehaviorSubject<boolean>( (localStorage.getItem('auth') !== "") );

  constructor(private fireauth:AngularFireAuth) { }

   public newUser(user:User){
   return this.fireauth.createUserWithEmailAndPassword(String(user.email), String(user.password));
  }

  public logar (user:User){
    return this.fireauth.signInWithEmailAndPassword(String(user.email),String(user.password));
  }

  public addUserInLocal(user:any){
    localStorage.setItem('auth', JSON.stringify(user));
    this.userLogado.next(true);
  }

  public RemoveUserInLocal(){
    localStorage.setItem('auth','');
    this.userLogado.next(false);
  }

  public getUserLogado(){
    return JSON.parse( String(localStorage.getItem('auth')));
  }

}


