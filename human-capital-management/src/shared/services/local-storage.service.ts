import { Injectable } from '@angular/core';
import { ID_TOKEN, USER_KEY } from 'src/shared/helpers/constants';
import { User } from 'src/shared/models/user.model';

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

    /**
     * Removes token value from local storage by Id
     */
    removeToken(): void {
        localStorage.removeItem(ID_TOKEN);
        localStorage.removeItem(USER_KEY);
    }

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


    saveUser(user: User): void {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    getUser(): User | undefined {
        const user = localStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return undefined;
    }
}
