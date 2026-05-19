import { Producto } from '../entities/producto.entity';

export interface ProductoRepository {
  crear(producto: Producto): Promise<Producto>;
  buscarTodos(): Promise<Producto[]>;
  actualizarStock(id: string, nuevoStock: number): Promise<Producto>;
}