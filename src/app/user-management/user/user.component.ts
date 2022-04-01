import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user!: User;
  @Output() update = new EventEmitter;
  isDisabled = true;

  modifyForm: FormGroup = this.formBuilder.group({
    username: [this.user?.username, Validators.required],
    role: [this.user?.role, Validators.required]
  });
  
  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.modifyForm.reset({role: this.user.role, username: this.user.username});
    this.modifyForm.controls['username'].disable();
    this.modifyForm.controls['role'].disable();
  }

  get username() {
    return this.modifyForm.get('username');
  }

  get role() {
    return this.modifyForm.get('role');
  }

  deleteUser() {
    if (this.user.id) {
      try {
        let success = this.userService.deleteUser(this.user.id);
        this.update.emit();
      } catch (err) {
        
      }
    }
  }

}
