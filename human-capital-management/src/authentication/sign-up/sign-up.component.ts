import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

    signUpForm = new FormGroup({
    username: new FormControl('', {
        validators: [Validators.required],
        }),
        password: new FormControl('', {
        validators: [Validators.required],
        }),
    });

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private tokenStorage: TokenStorageService
    ) { }

    ngOnInit(): void {
        
    }

    onSubmit(): void {
        const { username, password } = this.signUpForm.value;
        this.authService.signUp(username!, password!).subscribe({
            next: (value) => {
                console.log('User registered in!');
                console.log(value);
            }
        });
    }
}
