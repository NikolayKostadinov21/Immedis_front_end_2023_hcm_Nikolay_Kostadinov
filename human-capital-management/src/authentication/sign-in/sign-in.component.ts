import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { UserData } from '../../shared/models/userdata.model';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

    readonly signInForm = new FormGroup({
        email: new FormControl('', {
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
        const { email, password } = this.signInForm.value;
        this.authService.signIn(email!, password!).subscribe({
            next: (userData: UserData) => {
                this.localStorageService.setToken(userData.accessToken);
                this.localStorageService.saveUser(userData.user);
                this.router.navigate(['./dashboard']);
            }
        });
    }
}
