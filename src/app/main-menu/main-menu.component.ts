import { Component, OnInit } from '@angular/core';
import { MessageService } from '../Services/message.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private messageService: MessageService) {
    this.messageService.newTitle("Lakóközösség könyvelő"); 
  }

  ngOnInit(): void {
  }

  changeTitle(title: string) {
    this.messageService.newTitle(title);
  }

}
