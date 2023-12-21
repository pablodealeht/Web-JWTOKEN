import { Component, OnInit,Inject, PLATFORM_ID } from '@angular/core';
import { UsersService } from '../../Servicios/users.service';
import { AuthService } from '../../Servicios/auth.service';
import { Router } from '@angular/router';
import { MenuService } from '../../Servicios/menu.service';
import { Perfil } from '../../Menu/perfil.enum';
import { MenuItem } from '../../Menu/menu-item.model';
import { isPlatformBrowser } from '@angular/common';

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
  currentView: string = '';

  menuItems: MenuItem[] = [];


  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private menuService: MenuService,
    @Inject(PLATFORM_ID) private platformId: Object
    ) { }

  showAbmTest(): void {
    this.currentView = 'AbmTest';
    }

  // Comprueba si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.authService.getIsAuthenticated();
  }

  showChangePasswordForm() {
    this.isChangePasswordFormVisible = true;
  }
  // Cierra la sesión
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    // Aquí aseguramos que el código solo se ejecutará en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.username = this.usersService.getUsername();
      console.log('Usuario: ', this.username);

      //Ejemplo de uso de perfil
      const userProfile = Perfil.Administrador;
      this.menuItems = this.menuService.getMenusForProfile(userProfile);

      // Redirige al componente de login si no está validado el usuario
      if (!this.username) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
  }


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
