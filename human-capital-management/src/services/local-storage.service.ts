import { Injectable } from '@angular/core';
import { ID_TOKEN } from 'src/constants';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    /**
     * Sets token Key-value pair in local storage
     * @param {string} value
     */
    setToken(value: string): void {
        localStorage.removeItem(ID_TOKEN);
        localStorage.setItem(ID_TOKEN, value);
    }

    /**
     * Gets token value from local storage
     * @return {string | null}
     */
    getToken(): string | null {
        return localStorage.getItem(ID_TOKEN);
    }

    // /**
    //  * Removes token value from local storage by Id
    //  * @return {string | null}
    //  */
    // removeToken(): void {
    //     localStorage.removeItem(ID_TOKEN);
    // }

    /**
     * Remove all key-value pairs from the web browser's localStorage object.
     * @return {boolean}
     */
    hasTokenExpired(): boolean {
        return Date.now() >= (JSON.parse(atob(this.getToken()!.split('.')[1]))).exp * 1000;
    }

    /**
     * Remove all key-value pairs from the web browser's localStorage object.
     */
    signOut(): void {
        localStorage.clear();
    }
}
