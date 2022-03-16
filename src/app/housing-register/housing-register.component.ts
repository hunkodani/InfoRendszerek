import { Component, OnInit } from '@angular/core';
import { Housing } from '../Models/housing';
import { FlatService } from '../Services/flat.service';
import { MessageService } from '../Services/message.service';

@Component({
  selector: 'app-housing-register',
  templateUrl: './housing-register.component.html',
  styleUrls: ['./housing-register.component.css']
})
export class HousingRegisterComponent implements OnInit {

  isFormActive= false;
  flats: Housing[] = [];

  constructor(private flatService: FlatService,
              private messageService: MessageService) {
                this.messageService.newTitle("Lakások nyilvántartása"); 
  }

  ngOnInit(): void {
    this.getAllFlats();
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
