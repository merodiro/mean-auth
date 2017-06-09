import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';


export interface User {
  username: String;
  password: String;

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  login({ value, valid }: { value: User, valid: boolean }) {
    if(!valid) {
      this.flashMessages.show('Please fill all fields', { cssClass: 'alert-danger', timeOut: 3000 });
      return false;
    }
    this.authService.authenticate(value).subscribe(res => {
      console.log(res)
      if(res.success) {
        this.authService.storeUser(res.token, res.user);
        this.flashMessages.show('You are now logged in', { cssClass: 'alert-success', timeOut: 3000 });
        this.router.navigate(['/dashboard'])
      } else {
        this.flashMessages.show(res.msg, { cssClass: 'alert-danger', timeOut: 3000 });
      }

    });
  }

}
