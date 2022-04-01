import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Output() isHidden = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<boolean>();

  successMessage!: string;
  errorMessage!: string;

  personForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required]],
    role: [0, Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  get username() {
    return this.personForm.get('username');
  }

  get password() {
    return this.personForm.get('password');
  }

  get role() {
    return this.personForm.get('role');
  }

  async createPerson() {
    const user: User = {username: this.personForm.controls['username'].value, 
                          passw: this.personForm.controls['password'].value, 
                          role: this.personForm.controls['role'].value};
    this.successMessage = '';
    this.errorMessage = '';

    try {
      const userAdded = await this.userService.createUser(user);
      this.successMessage = `Felhasználó hozzáadva a következő id alatt: ${userAdded.id}`;
      //this.isHidden.emit(true);
      this.personForm.reset({name: '', accountBalance: 0});
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
}
