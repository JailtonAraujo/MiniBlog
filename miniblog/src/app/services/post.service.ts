import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { query, orderBy, startAt } from "firebase/firestore";
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private fireStorage:AngularFirestore, private db:AngularFireDatabase) { }

  public insertPost(post:Post){
    return this.fireStorage.collection<Post>('posts').add(post);
  }

  public selectAllPost(){
    return this.fireStorage.collection('posts', ref =>{
     return ref.orderBy('createdAt','desc').limit(5)
    }).snapshotChanges().pipe(map(actions => actions.map(a =>{
      const data = a.payload.doc.data() as Array<any>
      const id = a.payload.doc.id
      return {id:id, ...data}
    }) ))
   }

   public selectAllPostInfinitScrool(refPost:Post){
    return this.fireStorage.collection('posts', ref =>{
      return ref.orderBy('createdAt','desc').startAfter(refPost.createdAt).limit(2)
    }).snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Post
      const id = a.payload.doc.id
      return {id:id,...data}
    })))
    
   }

  public selectAllPostsByUid(uid:String){
   return this.fireStorage.collection('posts', ref =>{
    return ref.where('uid','==',uid)
   }).snapshotChanges().pipe(map(actions => actions.map(a =>{
    const data = a.payload.doc.data() as Post;
    const id = a.payload.doc.id;
    return {id:id, ...data}
   })))
  }

  public findPostByTag(tag:String){
    return this.fireStorage.collection('posts', ref =>{
      return ref.where('tags','array-contains',tag)
    }).valueChanges();
  }

 public deletePost(id:string){
    return this.fireStorage.doc(`posts/${id}`).delete();  
 }

 public findPostById(id:string){
    return this.fireStorage.doc(`posts/${id}`)
    .snapshotChanges().pipe(map((actions)=>{
      const data = actions.payload.data() as Post;
      const id = actions.payload.id;
      return {id:id, ...data}
    }))
 }

 public update(post:Post){
    return this.fireStorage.doc(`posts/${post.id}`).update(post);
 }



}
