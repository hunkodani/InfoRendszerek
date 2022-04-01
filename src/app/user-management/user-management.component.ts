import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { MessageService } from '../Services/message.service';
import { StorageService } from '../Services/storage.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  isFormActive= false;
  users: User[] = [];
  isAdmin = false;

  constructor(private messageService: MessageService,
              private storageService: StorageService,
              private userService: UserService) {
                this.messageService.newTitle("Felhasználók kezelése");}

  ngOnInit(): void {
    this.getAllUsers();
    this.storageService.getAuthentication();
    this.isAdmin = this.storageService.role === "admin";
  }

  activateForm() {
    this.isFormActive = true;
  }

  deactivateForm(hideForm: boolean) {
    this.isFormActive = !hideForm;
    this.getAllUsers();
  }

  async getAllUsers() {
    this.users = await this.userService.loadUsers();
  }


}
