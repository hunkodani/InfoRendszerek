import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlatService } from 'src/app/Services/flat.service';

@Component({
  selector: 'app-flat-form',
  templateUrl: './flat-form.component.html',
  styleUrls: ['./flat-form.component.css']
})
export class FlatFormComponent implements OnInit {

  @Output() isHidden = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<boolean>();

  successMessage!: string;
  errorMessage!: string;

  flatForm: FormGroup = this.formBuilder.group({
    floor: [4, [Validators.required, Validators.min(0)]],
    door: [1, [Validators.required, Validators.min(1)]],
    area: [1, [Validators.required, Validators.min(1)]],
    space: [1, [Validators.required, Validators.min(1)]],
    ownerid: [undefined]
  });

  constructor(private formBuilder: FormBuilder,
              private flatService: FlatService) { }

  ngOnInit(): void {
  }

  get floor() {
    return this.flatForm.get('floor');
  }

  get door() {
    return this.flatForm.get('door');
  }

  get area() {
    return this.flatForm.get('area');
  }
  
  get space() {
    return this.flatForm.get('space');
  }

  async createFlat() {
    const flat = this.flatForm.value;

    if (await this.isUniqueElement()) {
      this.successMessage = '';
      this.errorMessage = '';

      try {
        const flatAdded = await this.flatService.createFlat(flat);
        this.successMessage = `Lakás hozzáadva a következő id alatt: ${flatAdded.id}`;
        //this.isHidden.emit(true);
        this.flatForm.reset({floor: 4, door: 1, area: 1, space: 1});
        this.update.emit(true);
      } catch (err) {
        if (err instanceof Error) {
          this.errorMessage = err.message;
        }
      }
    }
    else {
      this.errorMessage = 'Ez a lakás már létezik';
    }
    
  }

  cancel() {
    this.isHidden.emit(true);
    this.flatForm.reset({floor: 4, door: 1, area: 1, space: 1});
    this.successMessage = "";
    this.errorMessage = "";
  }

  async isUniqueElement() {
    const flats = await this.flatService.loadFlats();
    var isUnique = true;

    flats.forEach(element => {
      if (element.floor === this.flatForm.controls['floor'].value &&
          element.door === this.flatForm.controls['door'].value) {
        isUnique = false;
      }
    });
    return isUnique;
  }

  closePopup() {
    this.errorMessage = "";
    this.successMessage = "";
  }

}
