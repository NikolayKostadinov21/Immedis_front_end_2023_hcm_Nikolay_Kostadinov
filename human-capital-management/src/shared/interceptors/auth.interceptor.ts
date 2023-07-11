import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { LocalStorageService } from "../../shared/services/local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private localStorageService: LocalStorageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const accessToken = this.localStorageService.getToken();

        if (accessToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + accessToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}

export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
];