import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = "https://localhost:7193/api/autenticacion"; // Cambiar por la URL correcta

  constructor(private http: HttpClient) {}

  login(user: string, password: string): Observable<any> {
    const body = JSON.stringify({ user: user, password: password });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.authUrl, body, { headers: headers }).pipe(
      tap((data) => {
        this.saveToken(data.token);
      }),
      catchError(this.handleError)
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Aquí puedes agregar lógica adicional para validar la expiración del token, si es necesario
    return !!token; // Retorna true si el token existe, false si no
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError('Hubo un error en la solicitud. Por favor, inténtalo de nuevo.');
  }

  // Método para cambiar la contraseña
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const body = JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken() // Agrega el token de autenticación
    });

    return this.http.post<any>(this.authUrl + '/change-password', body, { headers: headers }).pipe(
      tap((data) => {
        console.log('Contraseña cambiada con éxito', data);
      }),
      catchError(this.handleError)
    );
  }

  // Puedes agregar aquí más métodos según tus necesidades
}



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private authUrl = "https://localhost:7193/api/autenticacion"; // Cambiar por la URL correcta
//   public isAuthenticated = false;


//   constructor(private http: HttpClient) {}

//   login(user: string, password: string): Observable<any> {
//     const body = JSON.stringify({ user: user, password: password });
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//     return this.http.post<any>(this.authUrl, body, { headers: headers }).pipe(
//       tap((data) => {
//         this.saveToken(data.token);
//         this.setIsAuthenticated(true); // Establece la autenticación como verdadera
//       }),
//       catchError(this.handleError)
//     );
//   }

//   saveToken(token: string): void {
//     localStorage.setItem('auth_token', token);
//   }

//   getIsAuthenticated(): boolean {
//     return this.isAuthenticated;
//   }

//   setIsAuthenticated(value: boolean): void {
//     this.isAuthenticated = value;
//   }


// // Agrega la función para cambiar la contraseña
// changePassword(oldPassword: string, newPassword: string): Observable<any> {
//   const body = JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword });
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer ' + localStorage.getItem('auth_token') // Agrega el token de autenticación
//   });

//   return this.http.post<any>(this.authUrl + '/change-password', body, { headers: headers }).pipe(
//     tap((data) => {
//       // Puedes realizar acciones después de cambiar la contraseña si es necesario
//       console.log('Contraseña cambiada con éxito', data);
//     }),
//     catchError(this.handleError)
//   );
// }


//   logout(): void {
//     localStorage.removeItem('auth_token');
//     this.setIsAuthenticated(false); // Establece la autenticación como falsa al cerrar sesión
//   }

//   private handleError(error: HttpErrorResponse): Observable<never> {
//     console.error('Error en la solicitud:', error);
//     return throwError('Hubo un error en la solicitud. Por favor, inténtalo de nuevo.');
//   }
// }
