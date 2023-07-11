import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../shared/services/employees.service';
import { User } from '../../shared/models/user.model';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {

    displayedColumns: string[] = ['email', 'firstName', 'secondName', 'role', 'department', 'salary', 'age'];
    dataSource = new MatTableDataSource<User>();

    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private employeeService: EmployeeService
    ) { }

    ngOnInit(): void {
        this.getAllEmployees();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }

    getAllEmployees(): void {
        this.employeeService.getAll().subscribe(data => {
            this.dataSource.data = data;
        });
    }
}
