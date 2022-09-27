import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.sass']
})
export class EditPostComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private postService:PostService,
    private messageService:MessageService) { }

    post!:Post;
    textbtn = "Salvar"
    loading:Boolean = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.postService.findPostById(String(id)).subscribe((result)=>{
      this.post = result;
  
    })
  }

 async update(post:Post){
    this.loading = true;
    let tags = post.tags.toString().split(",")
    post = {...post,uid:this.post.uid,id:this.post.id,tags:tags}
    await this.postService.update(post)
    .then((result)=>{
      this.loading = false;
      this.messageService.addMessage('alert-success','Post atualizado com sucesso!');
    }).catch((error)=>{
      console.log(error);
      this.messageService.addMessage('alert-danger','Acorreu um error, por favor tente mais tarde!')
    })
    this.loading = false;
  }


}
