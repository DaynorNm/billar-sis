import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id?: string;
  nombre: string;
  telefono?: string;
  horasAcumuladas: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

  // Obtiene los clientes reales de PostgreSQL
  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // Registra un cliente nuevo en la base de datos
  crearCliente(cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  // Acumula horas de juego de forma directa
  acumularHoras(id: string, horas: number): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}/horas`, { horas });
  }
}
