import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/shared/services/local-storage.service';
import { UserData } from 'src/shared/models/userdata.model';
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
    // @audit this is not used anywhere
    errorMessage = '';

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
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    onSubmit(): void {
        const { username, password } = this.signInForm.value;
        this.authService.signIn(username!, password!).subscribe({
            next: (userData: UserData) => {
                console.log(userData);
                this.localStorageService.setToken(userData.accessToken);
                this.localStorageService.saveUser(userData.user);
                this.router.navigate(['./dashboard']);
            },
            error: error => {
                this.errorMessage = error.error.message;
            }
        });
    }

    reloadPage(): void {
        window.location.reload();
    }
}
