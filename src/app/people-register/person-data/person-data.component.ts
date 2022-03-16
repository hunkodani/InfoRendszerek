import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Housing } from 'src/app/Models/housing';
import { Person } from 'src/app/Models/person';
import { FlatService } from 'src/app/Services/flat.service';
import { PersonService } from 'src/app/Services/person.service';

@Component({
  selector: 'app-person-data',
  templateUrl: './person-data.component.html',
  styleUrls: ['./person-data.component.css']
})
export class PersonDataComponent implements OnInit {

  @Input() person!: Person;
  @Input() flats!: Housing[];
  @Output() update = new EventEmitter;
  flat: Housing = {floor: 0, door: 0, area: 0,space: 0};
  isDisabled = true;

  modifyForm: FormGroup = this.formBuilder.group({
    name: [this.person?.name, Validators.required],
    isResident: [this.person?.isResident? "igen" : "nem", Validators.required]
  });
  
  constructor(private flatService: FlatService,
              private personService: PersonService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const tmp = this.flats.find(item => item.residentId == this.person.id);
    if (tmp !== undefined) {
      this.flat = tmp;
    }
    this.modifyForm.reset({isResident: this.person.isResident? "igen" : "nem", name: this.person.name});
    this.modifyForm.controls['name'].disable();
    this.modifyForm.controls['isResident'].disable();
  }

  get name() {
    return this.modifyForm.get('name');
  }

  get isResident() {
    return this.modifyForm.get('isResident');
  }

  enableModify() {
    this.isDisabled = false;
    this.modifyForm.controls['name'].enable();
    this.modifyForm.controls['isResident'].enable();
  }

  disableModify() {
    this.isDisabled = true;
    this.modifyForm.reset({isResident: this.person.isResident? "igen" : "nem", name: this.person.name});
    this.modifyForm.controls['name'].disable();
    this.modifyForm.controls['isResident'].disable();
  }

  async modifyPerson() {
    let tmp = this.person;
    tmp.isResident = this.modifyForm.controls['isResident'].value === "igen";
    tmp.name = this.modifyForm.controls['name'].value;
    try {
      await this.personService.updatePerson(tmp);
      if (!tmp.isResident) {
        let allFlats = await this.flatService.loadFlats();
        allFlats.forEach(async element => {
          if (element.residentId === tmp.id) {
            element.residentId = 0;
            await this.flatService.updateFlat(element);
          }
        });
      }
      this.isDisabled = true;
      this.update.emit();
      this.modifyForm.controls['name'].disable();
      this.modifyForm.controls['isResident'].disable();
    } catch (err) {
      
    }
  }

}
