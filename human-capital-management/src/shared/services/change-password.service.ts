import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AUTH_API } from "../helpers/constants";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class ChangePasswordService {
    constructor(
        private httpClient: HttpClient
    ) {

    }

    changeUserPassword(employeeId: number, newPassword: string): Observable<User> {
        return this.httpClient.patch<User>(AUTH_API + `/users/${employeeId}`, 
            {
                password: newPassword
            }
        );
    }
}