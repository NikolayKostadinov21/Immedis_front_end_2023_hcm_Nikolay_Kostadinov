import { NgModule } from "@angular/core";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: 'login'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
    ]
})

export class AuthModule { }