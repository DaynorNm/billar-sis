import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductoRepository } from 'src/domain/repositories/producto.repository';
import { Producto } from 'src/domain/entities/producto.entity';

@Injectable()
export class PrismaProductoRepository implements ProductoRepository {
  constructor(private prisma: PrismaService) {}

  async crear(producto: Producto): Promise<Producto> {
    const p = await this.prisma.producto.create({
      data: {
        nombre: producto.nombre,
        descripcion: producto.descripcion ?? '',
        precioVenta: producto.precioVenta,
        stock: producto.stock,
        categoria: producto.categoria ?? 'Otros',
      },
    });
    return new Producto(p.nombre, p.precioVenta, p.stock, p.id, p.categoria, p.descripcion, p.createdAt, p.updatedAt);
  }

  async buscarTodos(): Promise<Producto[]> {
    const productosDB = await this.prisma.producto.findMany();
    return productosDB.map(p => 
      new Producto(p.nombre, p.precioVenta, p.stock, p.id, p.categoria, p.descripcion, p.createdAt, p.updatedAt)
    );
  }

  async actualizarStock(id: string, nuevoStock: number): Promise<Producto> {
    const p = await this.prisma.producto.update({
      where: { id },
      data: { stock: nuevoStock },
    });
    return new Producto(p.nombre, p.precioVenta, p.stock, p.id, p.categoria, p.descripcion, p.createdAt, p.updatedAt);
  }
}