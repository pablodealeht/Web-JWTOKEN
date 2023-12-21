import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
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
    private authService: AuthService,
    private router: Router,
    private menuService: MenuService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    // Aquí aseguramos que el código solo se ejecutará en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserFromLocalStorage();
      //Ejemplo de uso de perfil
      const userProfile = Perfil.Administrador;
      this.menuItems = this.menuService.getMenusForProfile(userProfile);
    }
  }

  private loadUserFromLocalStorage() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.username = usuario.username;
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  // Comprueba si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  showAbmTest(): void {
    this.currentView = 'AbmTest';
  }
}
