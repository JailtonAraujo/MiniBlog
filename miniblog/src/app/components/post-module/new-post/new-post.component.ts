import { Component, OnInit } from '@angular/core';
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
 loading:Boolean = false;

  constructor(private userService:UserService,
    private postService:PostService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    

    
  }

  handlerPost(post:Post){
      let tags = post.tags.toString().split(",");

      const auth = this.userService.getUserLogado();

      this.post = {...post, uid:auth.uid ,createdBy:auth.displayName, createdAt:new Date(), tags:tags}

      this.loading = true;

      this.postService.insertPost(this.post)
      .then((result)=>{
        this.messageService.addMessage('alert-success','Post criado com sucesso!');
        this.loading = false;
      }).catch((error)=>{
        console.log(error);
        this.messageService.addMessage('alert-danger','Erro ao criar post, por favor revise as informações...');
        this.loading = false;
      })
      this.loading = false;
      
  }

}
