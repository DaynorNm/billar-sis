import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
// CORRECCIÓN: Apuntamos a la infraestructura real de la mesa
import { PrismaMesaRepository } from '../../infrastructure/database/repositories/prisma-mesa.repository';
import { Mesa } from '../../domain/entities/mesa.entity';

@Controller('mesas')
export class MesaController {
  constructor(private mesaRepository: PrismaMesaRepository) {}

  @Post()
  async crear(@Body() mesa: Mesa) {
    return this.mesaRepository.crear(mesa);
  }

  @Get()
  async buscarTodas() {
    return this.mesaRepository.buscarTodas();
  }
  @Put(':id/estado')
    async actualizarEstado(@Param('id') id: string, @Body('estado') nuevoEstado: string) 
    {
  return this.mesaRepository.actualizarEstado(id, nuevoEstado);
    }
}