import { Controller, Get, Post, Body, Put, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaProductoRepository } from '../../infrastructure/database/repositories/prisma-producto.repository';
import { Producto } from '../../domain/entities/producto.entity';

@Controller('productos')
export class ProductoController {
  constructor(private productoRepository: PrismaProductoRepository) {}

  @Post()
  async crear(@Body() body: any) {
    // Instanciamos la entidad pura antes de mandarla al repositorio
    const nuevoProducto = new Producto(
      body.nombre,
      body.precioVenta,
      body.stock,
      undefined,
      body.categoria,
      body.descripcion
    );
    return this.productoRepository.crear(nuevoProducto);
  }

  @Get()
  async buscarTodos() {
    return this.productoRepository.buscarTodos();
  }

  @Put(':id/stock')
  async actualizarStock(
    @Param('id') id: string,
    @Body('stock', ParseIntPipe) nuevoStock: number
  ) {
    return this.productoRepository.actualizarStock(id, nuevoStock);
  }
}