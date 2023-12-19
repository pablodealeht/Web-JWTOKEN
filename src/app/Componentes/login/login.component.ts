import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Servicios/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../../Servicios/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ]
})


export class LoginComponent {
  user: string = '';
  password: string = '';
  hide = true;
  showError = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UsersService,
    private router: Router
  ) { }

  login(user: string, password: string) {
    this.authService.login(user, password).subscribe(data => {
      this.authService.saveToken(data.token);
      this.userService.setUsername(user);
      console.log('Nombre de usuario establecido:', this.userService.getUsername());
      this.router.navigate(['/principal']);
      console.log('Login exitoso', data);

    },
      error => {
        console.error('User: ', user)
        this.showError = true;
        console.error('Error en login', error)
      }
    );
  }
}
