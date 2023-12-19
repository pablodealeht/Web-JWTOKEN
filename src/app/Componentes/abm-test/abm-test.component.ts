
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-abm-test',
  templateUrl: './abm-test.component.html',
  styleUrl: './abm-test.component.css'
})
export class AbmTestComponent implements OnInit {
  data: any[] = []; // Almacena los datos obtenidos

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  fetchData() {
    // Realiza la solicitud HTTP GET
    this.http.get<any[]>('https://localhost:7193/promedio').subscribe(
      (response) => {
        this.data = response; // Almacena los datos en la variable "data"
      },
      (error) => {
        console.error('Error al obtener datos', error);
      }
    );
  }
}
