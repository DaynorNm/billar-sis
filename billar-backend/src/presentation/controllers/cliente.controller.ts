import { Controller, Get, Post, Body, Put, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaClienteRepository } from '../../infrastructure/database/repositories/prisma-cliente.repository';
import { Cliente } from '../../domain/entities/cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private clienteRepository: PrismaClienteRepository) {}

  @Post()
  async crear(@Body() body: any) {
    const nuevoCliente = new Cliente(body.nombre, body.telefono);
    return this.clienteRepository.crear(nuevoCliente);
  }

  @Get()
  async buscarTodos() {
    return this.clienteRepository.buscarTodos();
  }

  @Put(':id/horas')
  async acumularHoras(
    @Param('id') id: string,
    @Body('horas', ParseIntPipe) horas: number
  ) {
    return this.clienteRepository.acumularHoras(id, horas);
  }
}