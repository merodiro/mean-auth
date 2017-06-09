import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';


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

  constructor(private fb: FormBuilder, private flashMessages: FlashMessagesService) { }

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
    }
  }
}
