import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanMatchFn, CanMatch } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/services/local-storage.service';
import { TokenStorageService } from 'src/services/token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {

    constructor(
        private tokenStorageService: TokenStorageService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    canMatch(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // @audit make this one variable
        if (this.tokenStorageService.getAccessToken() && !this.localStorageService.hasTokenExpired()) {
            return true;
        } else {
            this.router.navigate(['./login']);
            return false;
        }
    }
}

// export const AuthGuard: CanMatchFn = (next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
//     return inject(PermissionsService).canMatch(next, state);
// }

// export const isAuthenticatedGuard: CanMatchFn = (): boolean => {
//     if (this.localStorageService.) {
//         return true;
//     } else {
//         this.router.navigate(['/login']);
//         return false;
//     }
// }
