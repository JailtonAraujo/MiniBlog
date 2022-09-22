import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private fireStorage:AngularFirestore) { }

  public insertPost(post:Post){
    return this.fireStorage.collection('posts').add(post);
  }

  public selectAll(uid:String){
   return this.fireStorage.collection('posts', ref =>{
    return ref.where('uid','==',uid)
   }).valueChanges();
  }

}
