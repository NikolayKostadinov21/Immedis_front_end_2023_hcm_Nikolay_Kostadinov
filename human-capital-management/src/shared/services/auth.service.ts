import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from "rxjs";
import { AUTH_API } from '../helpers/constants';
import { LocalStorageService } from "src/shared/services/local-storage.service";
import { Router } from "@angular/router";
import { UserData } from "src/shared/models/userdata.model";
import { User } from "src/shared/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClient,
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    /**
     * Signing in the user with its credentials
     *
     * @param {string} email
     * @param {string} password
     * @returns {Observable<User>}
     */
    signIn(email: string, password: string): Observable<UserData> {
        return this.httpClient.post<UserData>(AUTH_API + '/signin', {
            email,
            password
        }).pipe(
            shareReplay()
        );
    }

    /**
     * Signing up the user with its credentials
     * 
     * @param {string} email
     * @param {string} password
     * @returns {Observable<User>}
     */
    signUp(email: string, password: string, role: string, firstName: string, secondName: string): Observable<User> {
        return this.httpClient.post<User>(AUTH_API + '/signup', {
            email,
            password,
            role,
            firstName,
            secondName
        }).pipe(
            shareReplay()
        );
    }

    /**
     * Signing out the user from the system
     */
    signOut(): void {
        this.localStorageService.signOut();
        this.router.navigate(['./login']);
    }
}