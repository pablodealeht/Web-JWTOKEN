import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Servicios/users.service';
import { AuthService } from '../../Servicios/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'] // Corregido "styleUrl" a "styleUrls"
})
export class PrincipalComponent implements OnInit {
  username!: string;
  isSidebarOpen = false;
  isUserMenuOpen = false;
  isChangePasswordFormVisible = false; // Agrega esta propiedad

  constructor(private usersService: UsersService, private authService: AuthService,  private router: Router) {}

  // Comprueba si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.authService.getIsAuthenticated();
  }

  showChangePasswordForm() {
    this.isChangePasswordFormVisible = true;
  }
 // Cierra la sesión
logout() {
  this.authService.logout();
  // Redirige al componente de login después de cerrar la sesión
  this.router.navigate(['/login']);
}


  ngOnInit() {
    this.username = this.usersService.getUsername();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
