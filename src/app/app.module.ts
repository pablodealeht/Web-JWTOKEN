import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Componentes/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './AuthInterceptor';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { ChangePasswordComponent } from './Componentes/change-password/change-password.component';
import { AbmTestComponent } from './Componentes/abm-test/abm-test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    ChangePasswordComponent,
    AbmTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,

  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi: true},
    provideClientHydration(),
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
