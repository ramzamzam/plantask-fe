import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {AuthenticatedUserDTO} from './models/cotegory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: AuthenticatedUserDTO;
  title = 'plantask-fe';

  constructor(
    private authService: AuthService,
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
