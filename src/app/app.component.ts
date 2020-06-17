import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pyramid-front';

  constructor(private authService: AuthService, private router: Router) { }

  navigateToRoundInput() {
    this.router.navigate(['/round-input']);
  }

  addNewPlayer() {
    this.router.navigate(['/add-player']);
  }

  modifyPlayer() {
    this.router.navigate(['/modify-player']);
  }

  navigateToScheduleMatch() {
    this.router.navigate(['/schedule-match']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToLogout() {
    this.router.navigate(['/logout']);
  }

  backToHome() {
    this.router.navigate(['/']);
  }

  searchPlayer() {
    this.router.navigate(['/search-player']);
  }
}
