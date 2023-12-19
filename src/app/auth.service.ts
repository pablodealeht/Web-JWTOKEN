import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private authUrl = "https://localhost:7193/api/autenticacion" //Cambiar por variable global
  constructor(private http : HttpClient) { }

login(user:string , password : string): Observable<any> {
  const headers = new HttpHeaders({'Content-Type': 'application/json' });
  const body = JSON.stringify({ user: user, password: password});
  return this.http.post<any>(this.authUrl, body, {headers : headers});
}
saveToken(token : string) : void{
  localStorage.setItem('auth_token', token)
}

}
