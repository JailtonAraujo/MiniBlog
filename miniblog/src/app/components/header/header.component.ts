import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private useService:UserService,
    private router:Router,
    private auth:AngularFireAuth) { }

    user:any;

  ngOnInit(): void {
    //this.useService.userLogado.subscribe(userLogado => this.userLogado = userLogado);
    this.auth.authState.subscribe((auth)=>{
      this.user = auth;
      
    })
  }

  public Logout(){
    //this.useService.RemoveUserInLocal();
    this.auth.signOut();
    this.router.navigate(['/home']);
  }

}
