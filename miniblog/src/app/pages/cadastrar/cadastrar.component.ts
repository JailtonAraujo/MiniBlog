import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.sass']
})
export class CadastrarComponent implements OnInit {

  formUSer!: FormGroup;
  loading:Boolean = false;

  constructor(private messageService:MessageService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {

    this.formUSer = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirm : new FormControl('', [Validators.required]) 
    })
  }

  async submitedForm(){
    
    if(this.formUSer.get('password')?.value !== this.formUSer.get('password_confirm')?.value){
      this.messageService.addMessage("alert-danger","As senhas não correspondem, por favor confira-as!");
      return;
    }

    this.loading = true;

    this.userService.newUser(this.formUSer.value)
    .then((userCredential)=>{
      userCredential.user?.updateProfile({displayName:this.formUSer.get('name')?.value}).then((resp)=>{})
      this.userService.addUserInLocal(userCredential.user);//add user in localStorage and chenge behaviorSubject to true;
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }).catch((error)=>{

      if(error.message.includes("email-already")){
        this.messageService.addMessage('alert-danger','E-mail já cadastrado!');
      }else{
        this.messageService.addMessage('alert-danger','Ocorreu um erro, por favor tente mais tarde!');
      }
      console.log(error);
      this.loading = false;
    })

    this.loading = false;

  }

}