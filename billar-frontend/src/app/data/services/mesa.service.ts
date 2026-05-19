import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
export interface Mesa {
  id?: string;
  numero: number;
  tipo: string;
  precioPorHora: number;
  estado: 'DISPONIBLE' | 'OCUPADA' | 'MANTENIMIENTO';
  horaInicio?: string | Date | null;
  tiempoTranscurrido?: string;
  costoAcumulado?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private apiUrl = 'http://172.17.27.209:3000/mesas';

  constructor(private http: HttpClient) {}

  obtenerMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.apiUrl);
  }

  crearMesa(mesa: Mesa): Observable<Mesa> {
    return this.http.post<Mesa>(this.apiUrl, mesa);
  }

  actualizarEstado(id: string, estado: 'DISPONIBLE' | 'OCUPADA' | 'MANTENIMIENTO'): Observable<Mesa> {
    return this.http.put<Mesa>(`${this.apiUrl}/${id}/estado`, { estado });
  }
}
