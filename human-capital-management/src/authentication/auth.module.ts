import { NgModule, inject } from "@angular/core";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { Router, RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { LocalStorageService } from "../shared/services/local-storage.service";
import { Role } from "../shared/models/roles.model";

const routes: Routes = [
    {
        path: 'login',
        canActivate: [
            () => {
                const router = inject(Router);
                const isTokenValid = inject(LocalStorageService).getToken() && !inject(LocalStorageService).hasTokenExpired();
                if (isTokenValid) {
                    router.navigate(['']);
                    return false;
                } else {
                    return true;
                }
            }
        ],
        component: SignInComponent
    },
    {
        path: 'register',
        canMatch: [
            () => {
                const user = inject(LocalStorageService).getUser();
                if (user?.role === Role.admin) {
                    return true;
                } else {
                    return false;
                }
            }
        ],
        component: SignUpComponent
    },
    {
        path: 'dashboard',
        canMatch: [
            () => {
                const router = inject(Router);
                const isTokenValid = inject(LocalStorageService).getToken() && !inject(LocalStorageService).hasTokenExpired();
                if (isTokenValid) {
                    return true;
                } else {
                    router.navigate(['./login']);
                    return false;
                }
            }
        ],
        component: DashboardComponent
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

const modulesMaterial = [
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        ...modulesMaterial,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SignUpComponent,
        SignInComponent
    ]
})

export class AuthModule { }