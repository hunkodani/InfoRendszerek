import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Housing } from 'src/app/Models/housing';
import { Person } from 'src/app/Models/person';
import { FlatService } from 'src/app/Services/flat.service';
import { PersonService } from 'src/app/Services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  @Output() isHidden = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<boolean>();
  flats: Housing[] = [];

  successMessage!: string;
  errorMessage!: string;

  personForm: FormGroup = this.formBuilder.group({
    flat: ['', Validators.required],
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
    accountBalance: [0, Validators.required],
    isResident: [true]
  });

  constructor(private formBuilder: FormBuilder,
              private personService: PersonService,
              private flatService: FlatService) { }

  ngOnInit(): void {
    this.loadEmptyFlats();
  }

  get flat() {
    return this.personForm.get('flat');
  }

  get name() {
    return this.personForm.get('name');
  }

  get accountBalance() {
    return this.personForm.get('accountBalance');
  }

  async createPerson() {
    const person: Person = {name: this.personForm.controls['name'].value, 
                          accountBalance: this.personForm.controls['accountBalance'].value, 
                          isResident: true};
    this.successMessage = '';
    this.errorMessage = '';

    try {
      const residentAdded = await this.personService.createPerson(person);
      var flat = this.flats.find(item => item.id ==  this.personForm.controls['flat'].value);
      if (flat != undefined) {
        flat.residentId = residentAdded.id;
        flat = await this.flatService.updateFlat(flat);
      }
      this.successMessage = `Lakos hozzáadva a következő id alatt: ${residentAdded.id}, és hozzáadva a következő lakáshoz: ${flat?.floor}. emelet${flat?.door}. ajtó`;
      //this.isHidden.emit(true);
      this.personForm.reset({name: '', accountBalance: 0});
      this.loadEmptyFlats();
      this.update.emit(true);
    } catch (err) {
      if (err instanceof Error) {
        this.errorMessage = err.message;
      }
    }
  }

  cancel() {
    this.isHidden.emit(true);
    this.personForm.reset({name: '', accountBalance: 0});
    this.successMessage = "";
    this.errorMessage = "";
  }

  closePopup() {
    this.errorMessage = "";
    this.successMessage = "";
  }

  async loadEmptyFlats() {
    this.flats = (await this.flatService.loadFlats()).filter(item => item.residentId == undefined || item.residentId === 0);
  }

}
