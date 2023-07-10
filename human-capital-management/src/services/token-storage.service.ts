import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { USER_KEY } from 'src/constants';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {

    constructor(
        private localStorageService: LocalStorageService
    ) { }

    getAccessToken(): string {
        return this.localStorageService.getToken() as string;
    }

    saveAccessToken(tokenValue: string) {
        this.localStorageService.setToken(tokenValue);
    }

    public saveUser(user: any): void {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return {};
    }
}
