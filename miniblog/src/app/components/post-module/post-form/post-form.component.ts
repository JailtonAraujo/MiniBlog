import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.sass']
})
export class PostFormComponent implements OnInit {

  postForm!:FormGroup; 
  post!:Post;

  @Output() onSubmit = new EventEmitter<Post>();
  @Input() textBtn = "";

  constructor(private postService:PostService) { }

  ngOnInit(): void {

    this.postForm = new FormGroup({
      title :new FormControl(this.post ? this.post.title : '', [Validators.required]),
      url :new FormControl(this.post ? this.post.url : '', [Validators.required]),
      body:new FormControl(this.post ? this.post.body : ''),
      tags: new FormControl('', [Validators.required]) 
    })

  }

  public submit(){
  
    this.onSubmit.emit(this.postForm.value);
    this.postForm.reset();
  
  }

}
