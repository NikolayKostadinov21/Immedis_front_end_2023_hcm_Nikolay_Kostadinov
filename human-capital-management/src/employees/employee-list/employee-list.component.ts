import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../shared/services/employees.service';
import { User } from '../../shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Role } from '../../shared/models/roles.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {

    displayedColumns: string[] = ['email', 'firstName', 'lastName', 'role', 'department', 'salary', 'age', 'action'];
    dataSource = new MatTableDataSource<User>([]);
    currentUser!: User | undefined;
    isCurrentUserAdminOrModerator!: boolean;
    isCurrentUserAdmin!: boolean;
    usersMap = new Map<number, User>();

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private employeeService: EmployeeService,
        private dialog: MatDialog,
        private localStorageService: LocalStorageService,
        private changeDetectorRefs: ChangeDetectorRef
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
        this.dataSource.paginator = this.paginator;
    }

    getAllEmployees(): void {
        this.employeeService.getAll().subscribe(data => {
            this.dataSource.data = [...data];
            data.forEach(user => {
                this.usersMap.set(user.id, user);
            });
        });
    }

    editEmployee(userId: number): void {
        const dialogRef = this.dialog.open(EmployeeEditComponent, {
            data: {
                userId: userId,
                user: this.usersMap.get(userId)
            }
        });

        dialogRef.afterClosed().subscribe({
            next: (data) => {
                const tempUserId = this.dataSource.data.find(user => user.id === userId);
                this.dataSource.data[tempUserId!.id] = {...data};
                this.usersMap.set(userId, data);
                this.changeDetectorRefs.detectChanges();
            }
        });
    }

    deleteEmployee(userId: number): void {
        this.employeeService.deleteById(userId).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
                (user: User) => user.id !== userId
            );
            this.usersMap.delete(userId);
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
