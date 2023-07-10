import { NgModule } from "@angular/core";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
    {
        path: 'login',
        component: SignInComponent
    },
    {
        path: 'register',
        component: SignUpComponent
    },
];

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
    ]
})

export class AuthModule { }