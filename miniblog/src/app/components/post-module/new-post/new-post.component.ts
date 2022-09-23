import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit {

 post!:Post;
 user:any;

  constructor(private userService:UserService,
    private postService:PostService,
    private messageService:MessageService,
    private auth:AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.authState.subscribe((user)=>{
      this.user = user;
    })
  }

  handlerPost(post:Post){
      let tags = post.tags.toString().split(",");

      this.post = {...post, uid:this.user.uid ,createdBy:this.user.displayName, createdAt:new Date(), tags:tags}

      
      this.postService.insertPost(this.post)
      .then((result)=>{
        this.messageService.addMessage('alert-success','Post criado com sucesso!');
       
      }).catch((error)=>{
        console.log(error);
        this.messageService.addMessage('alert-danger','Erro ao criar post, por favor revise as informações...');
       
      })
   
      
  }

}
