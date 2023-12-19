import { HttpInterceptor, HttpRequest,HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

    intercept(request: HttpRequest<any>, next : HttpHandler):
    Observable <HttpEvent<any>> {
      const authToken = localStorage.getItem('auth_token');

        const authRequest = authToken ? request.clone({
          headers: request.headers.set('Authorization', 'Bearer ${authToken}')
          }) : request;

          return next.handle(authRequest).pipe(catchError((error : HttpErrorResponse) => {
            if(error.status=== 401 || error.status === 403) {

              //si el token es invalido o ha expirado
              localStorage.removeItem('auth_token');

              //Redirecciona al login
              this.router.navigate(['/login']);
            }
            return throwError(error)
          }
          ));
      }
    }
