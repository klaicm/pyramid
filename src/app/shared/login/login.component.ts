import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../../app.component.css']
})
export class LoginComponent implements OnInit {

    username = '';
    password = '';
    invalidLogin = false;

    constructor(private router: Router,
        private authService: AuthService) { }

    ngOnInit() {
    }

    checkLogin() {
        (this.authService.authenticate(this.username, this.password).subscribe(
            data => {
                this.router.navigate(['']);
                this.invalidLogin = false;
            },
            error => {
                this.invalidLogin = true;

            }));
    }

}
