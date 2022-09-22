import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit {

 post!:Post;

  constructor(private userService:UserService,
    private postService:PostService) { }

  ngOnInit(): void {
    

    
  }

  handlerPost(post:Post){
      let tags = post.tags.toString().split(",");

      const auth = this.userService.getUserLogado();

      this.post = {...post, uid:auth.uid ,createdBy:auth.displayName, createdAt:new Date(), tags:tags}

      this.postService.insertPost(this.post)
      .then((result)=>{
        console.log(result);
      }).catch((error)=>{
        console.log(error);
      })
      
  }

}
