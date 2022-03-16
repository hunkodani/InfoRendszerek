import { Component, OnInit } from '@angular/core';
import { MessageService } from './Services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  name = "Hunkó Dániel";
  code = "JQYQIU";
  mainTitle = "Lakóközösség könyvelő";

  constructor(public messageService: MessageService){
  }

  ngOnInit(): void {
    this.messageService.newTitle("Lakóközösség könyvelő");
  }
}
