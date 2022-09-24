import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.sass']
})
export class PostFormComponent implements OnInit {


  @Input() postData!:Post;
  @Output() onSubmit = new EventEmitter<Post>();
  @Input() textBtn = "";
  @Input () loading!:Boolean;

  postForm!:FormGroup; 

  constructor() { }

  ngOnInit(): void {


    this.postForm = new FormGroup({
      title :new FormControl(this.postData ? this.postData.title : '', [Validators.required]),
      url :new FormControl(this.postData ? this.postData.url : '', [Validators.required]),
      body:new FormControl(this.postData ? this.postData.body : ''),
      tags: new FormControl(this.postData ? this.postData.tags : '', [Validators.required]) 
    })

  }

  public submit(){
  
    this.onSubmit.emit(this.postForm.value);
    this.postForm.reset();
  
  }

}
