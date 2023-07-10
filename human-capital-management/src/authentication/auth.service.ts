import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, shareReplay } from "rxjs";
import { AUTH_API, HTTP_OPTIONS } from '../../src/constants';

export interface AccessData {
    token_type: 'Bearer';
    expires_in: number;
    access_token: string;
    refresh_token: string;
}

@Injectable({
    providedIn: 'root' // @audit what this does
})
export class AuthService {

    static readonly httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }) //@audit is this actually needed?
    };


    constructor(private httpClient: HttpClient) { }

    // @audit fix mock comment
    /**
     * Performs a request with user credentials
     * in order to get auth tokens
     *
     * @param {string} email
     * @param {string} password
     * @returns Observable<AccessData>
     */
    signIn(email: string, password: string): Observable<any> {
        return this.httpClient.post<any>('http://localhost:3000/login', {
            email,
            password
        }, HTTP_OPTIONS).pipe(
            shareReplay()
        );
    }

    // @audit fix mock comment
    /**
     * Performs a request with user credentials
     * in order to get auth tokens
     *
     * @param {string} email
     * @param {string} password
     * @returns Observable<AccessData>
     */
    signUp(email: string, password: string): Observable<any> {
        return this.httpClient.post<any>('http://localhost:3000/register', {
            email,
            password
        }, HTTP_OPTIONS);
    }
}