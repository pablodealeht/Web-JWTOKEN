import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() {}

  // Comprueba si el usuario está autenticado
  title = 'Web-JWTOKEN';
}
