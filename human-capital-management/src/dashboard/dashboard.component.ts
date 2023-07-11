import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/shared/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    signOut(): void {
        console.log('click')
        this.localStorageService.signOut();
    }

    request(): void {
        this.router.navigate(['./register']);
    }
}
