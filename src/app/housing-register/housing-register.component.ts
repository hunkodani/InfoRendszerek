import { Component, OnInit } from '@angular/core';
import { Housing } from '../Models/housing';
import { FlatService } from '../Services/flat.service';
import { MessageService } from '../Services/message.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-housing-register',
  templateUrl: './housing-register.component.html',
  styleUrls: ['./housing-register.component.css']
})
export class HousingRegisterComponent implements OnInit {

  isFormActive= false;
  flats: Housing[] = [];
  isAdmin = false;

  constructor(private flatService: FlatService,
              private messageService: MessageService,
              private storageService: StorageService) {
                this.messageService.newTitle("Lakások nyilvántartása"); 
  }

  ngOnInit(): void {
    this.getAllFlats();
    this.storageService.getAuthentication();
    this.isAdmin = this.storageService.role === "admin";
  }

  activateForm() {
    this.isFormActive = true;
  }

  deactivateForm(hideForm: boolean) {
    this.isFormActive = !hideForm;
  }

  async getAllFlats() {
    this.flats = await this.flatService.loadFlats();
  }

}
