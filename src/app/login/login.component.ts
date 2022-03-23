import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage!: string;

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async login() {
    let success = await this.storageService.authenticateUser(this.loginForm.controls['username'].value, 
                                                             this.loginForm.controls['password'].value);
    if (success) {
      this.router.navigate(['/main-menu']);
    } else {
      this.errorMessage = "Hibás felhasználónév vagy jelszó.";
    }
  }

  closePopup() {
    this.errorMessage = "";
  }

}
