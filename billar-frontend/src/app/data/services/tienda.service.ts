import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precioVenta: number;
  stock: number;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  // Trae los productos reales de PostgreSQL
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Actualiza el stock en la base de datos al vender
  actualizarStock(id: string, nuevoStock: number): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}/stock`, { stock: nuevoStock });
  }
  crearProducto(producto: Producto): Observable<Producto> {
  return this.http.post<Producto>(this.apiUrl, producto);
}
}
