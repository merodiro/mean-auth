import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isCollapsed: Boolean = true;

  constructor(
    public authService: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.flashMessages.show('You are logged out', { cssClass: 'alert-success', timeOut: 3000 });
    this.router.navigate(['/login'])
  }

}
