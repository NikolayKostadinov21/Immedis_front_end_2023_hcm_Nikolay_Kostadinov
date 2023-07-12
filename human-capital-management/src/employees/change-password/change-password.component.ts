import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

    constructor() {
        
    }

    changePasswordForm = new FormGroup({
        oldPassword: new FormControl('', {
            validators: [Validators.required]
        }),
        newPassword: new FormControl('', {
            validators: [Validators.required],
        }),
        confirmNewPassword: new FormControl('', {
            validators: [Validators.required],
        })
    });

    onSubmit(): void {
        console.log('change password');
    }
}
