import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../shared/services/employees.service';
import { Role } from '../../shared/models/roles.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent {

    roles: Role[] = [];

    constructor(
        private dialogRef: MatDialogRef<EmployeeEditComponent>,
        private employeeService: EmployeeService,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) { 
        this.roles = Object.values(Role);
    }

    editEmployeeForm = new FormGroup({
        firstName: new FormControl(this.data.user.firstName, {
            validators: [Validators.required, Validators.minLength(3)]
        }),
        lastName: new FormControl(this.data.user.lastName, {
            validators: [Validators.required, Validators.minLength(3)]
        }),
        role: new FormControl(this.data.user.role, {
            validators: [Validators.required]
        }),
        department: new FormControl(this.data.user.department, {
            validators: [Validators.required, Validators.minLength(5)]
        }),
        salary: new FormControl(this.data.user.salary, {
            validators: [Validators.required, Validators.min(1000)]
        }),
        age: new FormControl(this.data.user.age, {
            validators: [Validators.required, Validators.min(18)]
        })
    });

    onSubmit(): void {
        const { firstName, lastName, role, department, salary, age } = this.editEmployeeForm.value;
        this.employeeService.editById(this.data.userId, firstName!, lastName!, role!, department!, salary!, age).subscribe();
        this.dialogRef.close(this.editEmployeeForm.value);
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
