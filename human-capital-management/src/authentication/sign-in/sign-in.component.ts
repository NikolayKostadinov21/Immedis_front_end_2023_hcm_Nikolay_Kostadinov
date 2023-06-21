import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

    signInForm = new FormGroup({
    username: new FormControl('', {
        validators: [Validators.required],
        }),
        password: new FormControl('', {
        validators: [Validators.required],
        }),
    });

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        
    }

    onSubmit(): void {

    }
}
