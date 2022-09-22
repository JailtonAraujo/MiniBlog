import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  loading:Boolean = false;

  constructor(private userService:UserService,
    private messageService:MessageService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  async logar (){
    this.loading = true;
    await this.userService.logar(this.loginForm.value)
    .then((auth)=>{
      this.userService.addUserInLocal(auth.user);// add user in localStorage and change BehaviorSubject to true;
      this.router.navigate(['/dashboard']);

      this.loading = false;
    })
    .catch((error)=>{
      console.log(error);
      if(error.message.includes("password")){
        this.messageService.addMessage('alert-danger','E-mail ou senha incorretos!');
      } else{
        this.messageService.addMessage('alert-danger','Ocorreu um error, por favor tente mais tarde!');
      }
     
      this.loading = false;
    })
    this.loading = false;
  }



}
