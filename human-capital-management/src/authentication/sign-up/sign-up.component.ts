import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Role } from '../../shared/models/roles.model';

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
            validators: [Validators.required],
        }),
        firstName: new FormControl('', {
            validators: [Validators.required],
        }),
        lastName: new FormControl('', {
            validators: [Validators.required],
        }),
        role: new FormControl('', {
            validators: [Validators.required],
        }),
        department: new FormControl(''),
        salary: new FormControl(''),
        age: new FormControl('')
    });

    constructor(
        private authService: AuthService
    ) { 
        this.roles = Object.values(Role);
    }

    onSubmit(): void {
        const { email, password, firstName, lastName, role } = this.signUpForm.value;
        this.authService.signUp(email!, password!, role!, firstName!, lastName!).subscribe();
    }
}
