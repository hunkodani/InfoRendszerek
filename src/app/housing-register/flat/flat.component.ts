import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Housing } from 'src/app/Models/housing';
import { FlatService } from 'src/app/Services/flat.service';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.css']
})
export class FlatComponent implements OnInit {

  @Input() flat!: Housing;
  @Output() update = new EventEmitter;
  isDisabled = true;

  modifyForm: FormGroup = this.formBuilder.group({
    area: [this.flat?.area, Validators.required],
    space: [this.flat?.space, Validators.required]
  });

  constructor(private flatService: FlatService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.modifyForm.reset({area: this.flat.area, space: this.flat.space});
    this.modifyForm.controls['area'].disable();
    this.modifyForm.controls['space'].disable();
  }

  get area() {
    return this.modifyForm.get('area');
  }

  get space() {
    return this.modifyForm.get('space');
  }

  enableModify() {
    this.isDisabled = false;
    this.modifyForm.controls['area'].enable();
    this.modifyForm.controls['space'].enable();
  }

  disableModify() {
    this.isDisabled = true;
    this.modifyForm.reset({area: this.flat.area, space: this.flat.space});
    this.modifyForm.controls['area'].disable();
    this.modifyForm.controls['space'].disable();
  }

  async modifyFlat() {
    let tmp = this.flat;
    tmp.area = +this.modifyForm.controls['area'].value;
    tmp.space = +this.modifyForm.controls['space'].value;
    try {
      await this.flatService.updateFlat(tmp);
      this.isDisabled = true;
      this.update.emit();
    } catch (err) {
      
    }
  }

}
