import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private dataBase:AngularFireDatabase) { }

  public insertPost(post:Post){
    return this.dataBase.list('/posts').push(post);
  }

}
