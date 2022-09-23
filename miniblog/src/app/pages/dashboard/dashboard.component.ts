import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  posts:Array<any> = []
  loading:Boolean = false;
  user:any;

  constructor(private postService:PostService,
    private userService:UserService,
    private messageService:MessageService,
    private router:Router,
    private auth:AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.authState.subscribe((user)=>{
      this.user = user;
      console.log(this.user?.uid)
    });

    this.postService.selectAllPostsByUid(this.userService.getUserLogado().uid).subscribe((result)=>{
      this.posts = result
      console.log(result)
    });
  }

  async delete(id:string){

    if(confirm('Confirma a exclusão do post?')){
      this.loading = true;
    await this.postService.deletePost(id)
    .then((result)=>{
      this.messageService.addMessage('alert-success','Post deletado com sucesso!');
      this.posts = this.posts.filter((iten) => iten.id != id);
      this.loading = false;
    }).catch((error)=>{
      console.log(error);
      this.messageService.addMessage('alert-danger','Algo aconteceu, por favor tente mais tarde!');
      this.loading = false;
    })
    this.loading = false;
  }
  }

  public editar(id:string){
    this.router.navigate([`post/editpost/${id}`]);
  }

}
