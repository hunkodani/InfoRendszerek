import { Component, OnInit } from '@angular/core';
import { MessageService } from '../Services/message.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  isAdmin = false;

  constructor(private messageService: MessageService,
              private storageService: StorageService) {
    this.messageService.newTitle("Lakóközösség könyvelő"); 
  }

  ngOnInit(): void {
    this.storageService.getAuthentication();
    this.isAdmin = this.storageService.role === "admin";
  }

  changeTitle(title: string) {
    this.messageService.newTitle(title);
  }

  logout() {
    this.storageService.deleteAuthentication();
  }

}
