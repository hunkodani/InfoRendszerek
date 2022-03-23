import { Component, OnInit } from '@angular/core';
import { Housing } from '../Models/housing';
import { Person } from '../Models/person';
import { FlatService } from '../Services/flat.service';
import { MessageService } from '../Services/message.service';
import { PersonService } from '../Services/person.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-people-register',
  templateUrl: './people-register.component.html',
  styleUrls: ['./people-register.component.css']
})
export class PeopleRegisterComponent implements OnInit {
  
  isFormActive= false;
  people: Person[] = [];
  flats: Housing[] = [];
  isAdmin = false;

  constructor(private personService: PersonService,
              private flatService: FlatService,
              private messageService: MessageService,
              private storageService: StorageService) {
                this.messageService.newTitle("Lakók nyilvántartása");}

  ngOnInit(): void {
    this.getAllFlats();
    this.getAllPerson();
    this.storageService.getAuthentication();
    this.isAdmin = this.storageService.role === "admin";
  }

  activateForm() {
    this.isFormActive = true;
  }

  deactivateForm(hideForm: boolean) {
    this.isFormActive = !hideForm;
    this.getAllPerson();
    this.getAllFlats();
  }

  async getAllPerson() {
    this.people = await this.personService.loadPeople();
  }

  async getAllFlats() {
    this.flats = await this.flatService.loadFlats();
  }

}
