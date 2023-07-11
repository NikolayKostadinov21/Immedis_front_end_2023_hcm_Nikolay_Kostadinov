import { Component, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../shared/services/employees.service';
import { User } from '../../shared/models/user.model';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {

    employees = new Array<User>();
    displayedColumns: string[] = ['id', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource<User>();

    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private liveAnnouncer: LiveAnnouncer,
        private employeeService: EmployeeService
    ) { }

    ngOnInit(): void {
        this.getAllEmployees();
    }

    getAllEmployees(): void {
        this.employeeService.getAll().subscribe(data => {
            this.dataSource.data = data;
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this.liveAnnouncer.announce('Sorting cleared');
        }
    }
}
