import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    readonly signInForm = new FormGroup({
        username: new FormControl('', {
            validators: [Validators.required],
        }),
        password: new FormControl('', {
            validators: [Validators.required],
        }),
    });

    constructor(
        private authService: AuthService,
        private tokenStorage: TokenStorageService
    ) { }

    ngOnInit(): void {
        if (this.tokenStorage.getAccessToken()) {
            this.isLoggedIn = true;
        }
    }

    onSubmit(): void {
        const { username, password } = this.signInForm.value;
        this.authService.signIn(username!, password!).subscribe({
            next: (user) => {
                console.log('User logged in!');
                this.tokenStorage.saveAccessToken(user.accessToken);
                this.tokenStorage.saveUser(user);
                this.isLoginFailed = false;
                this.isLoggedIn = true;
                // redirect
            },
            error: error => {
                this.errorMessage = error.error.message;
                this.isLoginFailed = true;
            }
        });
    }

    reloadPage(): void {
        window.location.reload();
    }
}
