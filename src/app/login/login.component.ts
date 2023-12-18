// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   user: string = '';
//   password: string = '';

//   constructor(private http: HttpClient) {}

//   onSubmit() {
//     const loginData = { User: this.user, Password: this.password };
//     console.log("Aca va el user" , this.user, " < - sabias ?");
//     // Asegúrate de utilizar la URL correcta para tu servidor de backend
//     const backendUrl = 'http://localhost:7193'; // Cambia esto con la dirección correcta
//     const apiUrl = `${backendUrl}/api/autenticacion`;
//     console.log("url: ",apiUrl)

//     this.http.post(apiUrl, loginData).subscribe(
//       (response) => {
//         console.log('Inicio de sesión exitoso', response);
//         console.log("Bien: " , this.user);
//         console.log("Bien password: " , this.password);
//         console.log("Json: " , loginData);
//         // Puedes realizar acciones adicionales después del inicio de sesión exitoso
//       },
//       (error) => {
//         console.log("Json: " , loginData);
//         console.log("Mal: " , this.user);
//         console.log("Mal pass: " , this.password);
//         console.error('Error al iniciar sesión', error);
//         // Puedes manejar errores específicos o mostrar mensajes al usuario
//       }
//     );
//   }
// }

//////////////////////////////////////////////////////////// Intento 2

// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   user: string = '';
//   password: string = '';

//   constructor(private http: HttpClient, private authService : AuthService) {}

//   onSubmit() {
//     const loginData = { user: this.user, password: this.password };

//     // Asegúrate de utilizar la URL correcta para tu servidor de backend
//     const backendUrl = 'https://localhost:7193';
//     const apiUrl = `${backendUrl}/api/autenticacion`;

//     this.http.post(apiUrl, loginData).subscribe(
//       (response) => {
//         console.log('Inicio de sesión exitoso', response);
//         // Puedes realizar acciones adicionales después del inicio de sesión exitoso
//       },
//       (error) => {
//         console.log(loginData)
//         console.error('Error al iniciar sesión', error);
//         // Puedes manejar errores específicos o mostrar mensajes al usuario
//       }
//     );
//   }
// }

//////////////// intento 3


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: string = '';
  password: string = '';

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(user : string, password : string) {
    this.authService.login(user, password).subscribe(data => {
      console.log('Login exitoso', data);
      //manejo de la resp exitosa

    },
      error => {
        console.error('User: ', user)
        console.error('Error en login', error)
      }
    );
  }
}
