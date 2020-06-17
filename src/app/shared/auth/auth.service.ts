import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private static AUTHENTICATE_URL = environment.url + '/authenticate';

    constructor(private httpClient: HttpClient) { }

    authenticate(username, password) {
        return this.httpClient.post<any>(AuthService.AUTHENTICATE_URL, {username, password}).pipe(
            map(
                userData => {
                    sessionStorage.setItem('username', username);
                    const tokenStr = 'Bearer ' + userData.token;
                    sessionStorage.setItem('token', tokenStr);
                    return userData;
                }
            )
        );
    }

    isUserLoggedIn() {
        const user = sessionStorage.getItem('username');
        return !(user === null);
    }

    isUserAdmin() {
        const user = sessionStorage.getItem('username');
        return !(user === null && user !== 'admin');
    }

    logOut() {
        sessionStorage.removeItem('username');
    }
}
