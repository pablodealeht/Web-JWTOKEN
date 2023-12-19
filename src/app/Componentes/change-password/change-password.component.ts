import { Component } from '@angular/core';
import { AuthService } from '../../Servicios/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword = '';
  newPassword = '';
  repeatPassword = '';

  constructor(private authService: AuthService) {}

  changePassword() {
    // Verifica que las contraseñas coincidan
    if (this.newPassword === this.repeatPassword) {
      // Llama al servicio AuthService para cambiar la contraseña
      this.authService.changePassword(this.oldPassword, this.newPassword).subscribe(
        () => {
          // Contraseña cambiada exitosamente, puedes mostrar un mensaje de éxito
          console.log('Contraseña cambiada con éxito');
        },
        (error) => {
          // Manejo de errores, puedes mostrar un mensaje de error
          console.error('Error al cambiar la contraseña', error);
        }
      );
    } else {
      // Las contraseñas no coinciden, muestra un mensaje de error
      console.error('Las contraseñas no coinciden');
    }
  }
}
