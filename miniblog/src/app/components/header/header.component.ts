import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private useService:UserService,
    private router:Router) { }

  userLogado!:Boolean;

  ngOnInit(): void {
    this.useService.userLogado.subscribe(userLogado => this.userLogado = userLogado);
  }

  public Logout(){
    this.useService.RemoveUserInLocal();
    this.router.navigate(['/home']);
  }

}
