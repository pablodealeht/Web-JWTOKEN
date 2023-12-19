import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = "https://localhost:7193/api/autenticacion"; // Cambiar por la URL correcta
  public isAuthenticated = false;


  constructor(private http: HttpClient) {}

  login(user: string, password: string): Observable<any> {
    const body = JSON.stringify({ user: user, password: password });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.authUrl, body, { headers: headers }).pipe(
      tap((data) => {
        this.saveToken(data.token);
        this.setIsAuthenticated(true); // Establece la autenticación como verdadera
      }),
      catchError(this.handleError)
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  setIsAuthenticated(value: boolean): void {
    this.isAuthenticated = value;
  }


// Agrega la función para cambiar la contraseña
changePassword(oldPassword: string, newPassword: string): Observable<any> {
  const body = JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword });
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('auth_token') // Agrega el token de autenticación
  });

  return this.http.post<any>(this.authUrl + '/change-password', body, { headers: headers }).pipe(
    tap((data) => {
      // Puedes realizar acciones después de cambiar la contraseña si es necesario
      console.log('Contraseña cambiada con éxito', data);
    }),
    catchError(this.handleError)
  );
}


  logout(): void {
    localStorage.removeItem('auth_token');
    this.setIsAuthenticated(false); // Establece la autenticación como falsa al cerrar sesión
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError('Hubo un error en la solicitud. Por favor, inténtalo de nuevo.');
  }
}




// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
// private authUrl = "https://localhost:7193/api/autenticacion" //Cambiar por variable global
//   constructor(private http : HttpClient) { }

// login(user:string , password : string): Observable<any> {
//   const headers = new HttpHeaders({'Content-Type': 'application/json' });
//   const body = JSON.stringify({ user: user, password: password});
//   return this.http.post<any>(this.authUrl, body, {headers : headers});
// }
// saveToken(token : string) : void{
//   localStorage.setItem('auth_token', token)
// }

// }
