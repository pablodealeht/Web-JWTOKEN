import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { ChangePasswordComponent } from './Componentes/change-password/change-password.component';
import { AbmTestComponent } from './Componentes/abm-test/abm-test.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent,
  children: [
    { path: 'cambiar-contrasena', component: ChangePasswordComponent },
  ], },
  { path: 'AbmTest', component: AbmTestComponent },
  // puedes agregar una ruta de redirección si lo deseas, como por ejemplo:
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
