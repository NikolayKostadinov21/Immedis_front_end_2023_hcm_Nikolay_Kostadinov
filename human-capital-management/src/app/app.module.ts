import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from 'src/authentication/auth.module';
import { SignInComponent } from 'src/authentication/sign-in/sign-in.component';
import { SignUpComponent } from 'src/authentication/sign-up/sign-up.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [
        AppComponent,
        SignUpComponent,
        SignInComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule 
        // AuthModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
