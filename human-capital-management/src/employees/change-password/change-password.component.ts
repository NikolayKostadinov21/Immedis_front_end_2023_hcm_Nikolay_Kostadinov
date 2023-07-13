import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from '../../shared/services/change-password.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

    newPassword = new FormControl(null, [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
    ]);
    confirmPassword = new FormControl(null, [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
    ]);

    constructor(
        private changePasswordService: ChangePasswordService,
        private localStorageService: LocalStorageService,
        private formBuilder: FormBuilder
    ) { }

    changePasswordForm = this.formBuilder.group(
        {
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword,
        },
        {
            validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
        }
    );

    onSubmit(): void {
        if (!this.changePasswordForm?.valid) {
            return;
        }

        const currentUserId = this.localStorageService.getUser()?.id;
        const { newPassword } = this.changePasswordForm.value;
        this.changePasswordService.changeUserPassword(currentUserId!, newPassword!).subscribe();
    }

    ConfirmedValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (
                matchingControl.errors &&
                !matchingControl.errors['confirmedValidator']
            ) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
}
