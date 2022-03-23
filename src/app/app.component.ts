import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from './Services/message.service';
import { StorageService } from './Services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  name = "Hunkó Dániel";
  code = "JQYQIU";
  mainTitle = "Lakóközösség könyvelő";

  constructor(public messageService: MessageService,
              private storageService: StorageService,
              private router: Router){
  }

  ngOnInit(): void {
    this.messageService.newTitle("Lakóközösség könyvelő");
    this.storageService.getAuthentication();
    if (this.storageService.name && this.storageService.role) {
      this.router.navigate(['/main-menu']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
