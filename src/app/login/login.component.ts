import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserdataService } from '../services/userservice/userdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  users: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private userDataService: UserdataService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('assets/users.json').subscribe((data) => {
      this.users = data.map((user) => ({
        ...user,
        initials: `${user.firstName}. ${user.lastName[0]}`,
      }));
    });
  }

  navigateToHome(user: any) {
    this.userDataService.setUserData(user);
    this.router.navigate(['/home']);
  }
}
