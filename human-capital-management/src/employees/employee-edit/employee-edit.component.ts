import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../shared/services/employees.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent {

    constructor(
        private dialogRef: MatDialogRef<EmployeeEditComponent>,
        private employeeService: EmployeeService,
        @Inject(MAT_DIALOG_DATA) private employeeIdToChange: number
    ) { }

    editEmployeeForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        role: new FormControl(''),
        department: new FormControl(''),
        salary: new FormControl(''),
        age: new FormControl(),
    });

    onSubmit(): void {
        const { firstName, lastName, role, department, salary, age } = this.editEmployeeForm.value;
        this.employeeService.editById(this.employeeIdToChange, firstName!, lastName!, role!, department!, salary!, age).subscribe();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
