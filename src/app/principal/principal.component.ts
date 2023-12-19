import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
    selector: 'app-principal',
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css'
  })
export class PrincipalComponent implements OnInit {
  username!: string;
  isSidebarOpen = false;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.username = this.usersService.getUsername();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
