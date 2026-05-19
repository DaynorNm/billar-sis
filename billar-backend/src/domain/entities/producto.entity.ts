export class Producto {
  id?: string; // Lo hacemos opcional porque Postgres lo genera automáticamente
  nombre: string;
  descripcion?: string | null; // Aceptamos null de la base de datos
  precioVenta: number;
  stock: number;
  categoria?: string | null;  // Aceptamos null de la base de datos
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    nombre: string, 
    precioVenta: number, 
    stock: number, 
    id?: string, 
    categoria?: string | null, 
    descripcion?: string | null,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.nombre = nombre;
    this.precioVenta = precioVenta;
    this.stock = stock;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}