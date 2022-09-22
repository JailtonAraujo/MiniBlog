import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message=""
  statusClass = ""

  constructor() { }

  public addMessage(statusClass :string, message:string){
   
      this.message=message;
      this.statusClass = statusClass;

      setTimeout(()=>{
        this.removeMessage();
      },4000)
    }

  public removeMessage () {
    this.message = "";
    this.statusClass = "";
  }
}
