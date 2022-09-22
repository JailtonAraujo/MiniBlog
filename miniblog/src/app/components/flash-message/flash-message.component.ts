import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.sass']
})
export class FlashMessageComponent implements OnInit {

  constructor(public messageService:MessageService) { }

  ngOnInit(): void {
  }

}
