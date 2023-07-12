import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { AUTH_API } from "../helpers/constants";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getAll(): Observable<User[]> {
        return this.httpClient.get<User[]>(AUTH_API + '/users');
    }

    getById(employeeId: number): Observable<User> {
        return this.httpClient.get<User>(AUTH_API + `/users${employeeId}`);
    }

    editById(employeeId: number, firstName: string, lastName: string, role: string, department: string, salary: string, age: number): Observable<User> {
        return this.httpClient.patch<User>(AUTH_API + `/users/${employeeId}`, 
            {
                firstName,
                lastName,
                role,
                department,
                salary,
                age
            }
        );
    }
}