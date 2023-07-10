import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';

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

    // getRefreshToken(): string {
    //     return this.localStorageService.getItem(this.refreshTokenKey) as string;
    // }

    // saveRefreshToken(token: string) {
    //     this.localStorageService.setItem(this.refreshTokenKey, token);
    // }

    // saveTokens(accessToken: string, refreshToken: string) {
    //     this.saveAccessToken(accessToken);
    //     this.saveRefreshToken(refreshToken);
    // }

    // removeTokens() {
    //     this.localStorageService.removeItem(this.accessTokenKey);
    //     this.localStorageService.removeItem(this.refreshTokenKey);
    // }
}
