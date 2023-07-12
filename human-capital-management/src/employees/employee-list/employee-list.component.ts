import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../shared/services/employees.service';
import { User } from '../../shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Role } from '../../shared/models/roles.model';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {

    displayedColumns: string[] = ['email', 'firstName', 'secondName', 'role', 'department', 'salary', 'age', 'action'];
    dataSource = new MatTableDataSource<User>([]);
    currentUser!: User | undefined;
    isCurrentUserAdminOrModerator!: boolean;
    isCurrentUserAdmin!: boolean;

    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private employeeService: EmployeeService,
        private dialog: MatDialog,
        private localStorageService: LocalStorageService
    ) {
        this.currentUser = this.localStorageService.getUser();
        if (this.currentUser?.role === Role.admin || this.currentUser?.role === Role.moderator) {
            this.isCurrentUserAdminOrModerator = true;
        }

        if (this.currentUser?.role === Role.admin) {
            this.isCurrentUserAdmin = true;
        }
    }

    ngOnInit(): void {
        this.getAllEmployees();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }

    getAllEmployees(): void {
        this.employeeService.getAll().subscribe(data => {
            this.dataSource.data = [...data];
        });
    }

    editEmployee(userId: number): void {
        const dialogRef = this.dialog.open(EmployeeEditComponent, {
            data: userId
        });

        dialogRef.afterClosed().subscribe(_ => {
            console.log('The dialog was closed');
        });
    }

    deleteEmployee(userId: number): void {
        this.employeeService.deleteById(userId).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
                (user: User) => user.id !== userId
            );
        });
    }
}
