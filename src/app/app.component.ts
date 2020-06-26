import { Component, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {

  title = 'pyramid-front';

  constructor(private authService: AuthService, private router: Router, private changeDetector: ChangeDetectorRef) { }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  get isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  get isUserAdmin() {
    return this.authService.isUserAdmin();
  }

  navigateToRoundInput() {
    this.router.navigate(['/round-input']);
  }

  navigateToSeasonInput() {
    this.router.navigate(['/season-input']);
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
