import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('auth_token');

    const authRequest = authToken ? request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`)
    }) : request;

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Si el token es inválido o ha expirado
          localStorage.removeItem('auth_token');

          // Mostrar un mensaje al usuario
          window.alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');

          // Redireccionar al login
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}