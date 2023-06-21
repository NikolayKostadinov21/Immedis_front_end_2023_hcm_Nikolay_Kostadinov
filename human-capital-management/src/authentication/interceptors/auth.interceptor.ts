import { HttpEvent, HttpInterceptor } from "@angular/common/http";
import { EMPTY, Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
    intercept(): Observable<HttpEvent<unknown>> {
        return EMPTY;
    }
}