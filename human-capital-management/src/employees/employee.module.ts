import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EmployeeEditComponent } from "./employee-edit/employee-edit.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [];

const modulesMaterial = [
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        ...modulesMaterial,
        BrowserAnimationsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        EmployeeListComponent,
        EmployeeEditComponent
    ]
})

export class EmployeeModule { }