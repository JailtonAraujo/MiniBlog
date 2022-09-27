import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  notResults: Boolean = false;
  loading:Boolean = false;

  constructor(private postService: PostService,
    private messageService: MessageService,
    public router: Router) { }

  ngOnInit(): void {
    this.postService.selectAllPost().subscribe((result) => {
      this.posts = result;
    })

  }

  async search() {

    if (this.searchName.name) {
      await this.postService.findPostByTag(this.searchName.name).subscribe((result) => {
        this.posts = result;
        if (result.length == 0) {
          this.messageService.addMessage('alert-danger', `Sem resultados para ${this.searchName.name.toUpperCase()}`);
        }
      })
    } else {
      this.postService.selectAllPost().subscribe((result) => {
        this.posts = result;
      })
    }
  }

  

  async onScroll() {

    if(!this.searchName.name){
      this.loading = true;

      this.postService.selectAllPostInfinitScrool(this.posts[this.posts.length - 1])
      .subscribe((result) => {

        if (result.length > 0) {
          this.posts = [...this.posts, ...result]
        
        } else {
          this.notResults = true;
        }

      })

    }else{
      this.loading = true;
    this.postService.findPostByTagInfiteScrool(this.searchName.name,this.posts[this.posts.length - 1]).subscribe((result)=>{
        this.loading = false;
        if(result.length > 0){
          this.posts = [...this.posts, ...result];
        }else{
          this.notResults = true;
        }

      })
      
    }
    this.loading = false;
    

    }

   

  }


