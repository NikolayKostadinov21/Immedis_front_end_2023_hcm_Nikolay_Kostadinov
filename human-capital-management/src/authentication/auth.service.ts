import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay } from "rxjs";


@Injectable({
    providedIn: 'root' // @audit what this does
})
export class AuthService {

    static readonly httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }) //@audit is this actually needed?
    };

    constructor(private httpClient: HttpClient) { }

    /**
     * Performs a request with user credentials
     * in order to get auth tokens
     *
     * @param {string} email
     * @param {string} password
     * @returns Observable<>
     */
    login(email: string, password: string): Observable<any> { // Observable <type> missing! @audit
        return this.httpClient.post('API', {
            email,
            password
        })
        .pipe(
            // shareReplay(1) @audit shareReplay(1) implementation considaeration!
        )
    }

    register(email: string, password: string, username: string): Observable<any> {
        return this.httpClient.post<any>('API', {
            email,
            password,
            username
        })
    }
}