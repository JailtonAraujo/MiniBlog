import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  posts!: Array<any>;

  searchName = {
    name: ""
  }

  constructor(private postService: PostService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.postService.selectAllPost().subscribe((result) => {
      this.posts = result;
    })
  }

  async search() {

    if (this.searchName.name) {
      await this.postService.findPostByTag(this.searchName.name).subscribe((result) => {
        this.posts = result;
        if(result.length == 0){
          this.messageService.addMessage('alert-danger',`Sem resultados para ${this.searchName.name.toUpperCase()}`);
        }
      })
    }else{
      this.postService.selectAllPost().subscribe((result) => {
        this.posts = result;
      })
    }
  }

}
