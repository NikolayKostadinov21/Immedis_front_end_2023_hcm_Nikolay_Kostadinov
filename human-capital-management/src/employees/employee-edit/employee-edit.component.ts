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
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {

    }

    editEmployeeForm = new FormGroup({
        firstName: new FormControl(this.data.user.firstName),
        lastName: new FormControl(this.data.user.lastName),
        role: new FormControl(this.data.user.role),
        department: new FormControl(this.data.user.department),
        salary: new FormControl(this.data.user.salary),
        age: new FormControl(this.data.user.age)
    });

    onSubmit(): void {
        const { firstName, lastName, role, department, salary, age } = this.editEmployeeForm.value;
        this.employeeService.editById(this.data.userId, firstName!, lastName!, role!, department!, salary!, age).subscribe();
        this.dialogRef.close(this.editEmployeeForm.value);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
