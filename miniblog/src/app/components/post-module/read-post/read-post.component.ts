import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.sass']
})
export class ReadPostComponent implements OnInit {

  post!:Post;

  constructor(private route:ActivatedRoute,
    private postService:PostService,
    public router:Router) { }

  ngOnInit(): void {
    
    const id  = this.route.snapshot.paramMap.get('id');

    this.postService.findPostById(String(id)).subscribe((result)=>{
      this.post = result;
    })
  }

}
 