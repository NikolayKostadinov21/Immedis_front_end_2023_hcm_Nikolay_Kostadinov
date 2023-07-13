import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Role } from '../../shared/models/roles.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

    roles: Role[] = [];

    signUpForm = new FormGroup({
        email: new FormControl('', {
            validators: [Validators.required]
        }),
        password: new FormControl('', {
            validators: [Validators.required]
        }),
        firstName: new FormControl('', {
            validators: [Validators.required, Validators.minLength(3)]
        }),
        lastName: new FormControl('', {
            validators: [Validators.required, Validators.minLength(3)]
        }),
        role: new FormControl('', {
            validators: [Validators.required]
        }),
        department: new FormControl('', {
            validators: [Validators.required, Validators.minLength(5)]
        }),
        salary: new FormControl(null, {
            validators: [Validators.required, Validators.min(1000)]
        }),
        age: new FormControl(null, {
            validators: [Validators.required, Validators.min(18)]
        })
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.roles = Object.values(Role);
    }

    onSubmit(): void {
        if (this.signUpForm.valid) {
            const { email, password, firstName, lastName, role, department, salary, age } = this.signUpForm.value;
            this.authService.signUp(
                email!,
                password!,
                role!,
                firstName!,
                lastName!,
                department!,
                salary!,
                age!).subscribe({
                    error: (error) => {
                        this.snackBar.open(error.error);
                    }
                });
            this.router.navigate(['./employees']);
        }
    }

    goBack(): void {
        this.router.navigate(['./employees']);
    }
}
