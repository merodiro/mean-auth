import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';

export interface User {
  name: String;
  username: String;
  email: String;
  password: String;

}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm()
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      'name': '',
      'username': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required]
    });
  }

  register({ value, valid }: { value: User, valid: boolean }) {
    if(!valid) {
      this.flashMessages.show('Please fill all fields', { cssClass: 'alert-danger', timeOut: 3000 })
      return false;
    }

    this.authService.register(value).subscribe(res => {
      if(res.success) {
        this.flashMessages.show('you are now registered and can login', { cssClass: 'alert-success', timeOut: 3000 })
        this.router.navigate(['/login'])
      } else {
        this.flashMessages.show('SOmething went wrong', { cssClass: 'alert-danger', timeOut: 3000 })
      }
    });
  }
}
