import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SnackMessageService } from '../services/snackbar-message.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../../app.component.css']
})
export class LoginComponent implements OnInit {

    username = '';
    password = '';
    invalidLogin = false;

    constructor(private router: Router, private authService: AuthService, private snackMessageService: SnackMessageService) { }

    ngOnInit() {
    }

    checkLogin() {
        (this.authService.authenticate(this.username, this.password).subscribe(
            data => {
                this.router.navigate(['']);
                this.invalidLogin = false;
                this.snackMessageService.showSuccess('Uspješna prijava.');
            },
            error => {
                this.invalidLogin = true;
                this.snackMessageService.showError('Netočni podaci za prijavu.');
            }));
    }

}
