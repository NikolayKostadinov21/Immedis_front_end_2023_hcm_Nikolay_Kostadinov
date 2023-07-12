import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from '../../shared/services/change-password.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

    constructor(
        private changePasswordService: ChangePasswordService,
        private localStorageService: LocalStorageService
    ) {

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
        const currentUserId = this.localStorageService.getUser()?.id;
        const { newPassword } = this.changePasswordForm.value;
        this.changePasswordService.changeUserPassword(currentUserId!, newPassword!).subscribe();
    }
}
