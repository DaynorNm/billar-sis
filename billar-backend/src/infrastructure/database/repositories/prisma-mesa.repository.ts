import { MesaRepository } from 'src/domain/repositories/mesa.repository'; 
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Mesa } from '../../../domain/entities/mesa.entity';

@Injectable()
export class PrismaMesaRepository implements MesaRepository {
  constructor(private prisma: PrismaService) {}

  async crear(mesa: Mesa): Promise<Mesa> {
    const creada = await this.prisma.mesa.create({
      data: {
        numero: mesa.numero,
        tipo: mesa.tipo,
        precioPorHora: mesa.precioPorHora,
        estado: 'DISPONIBLE',
      },
    });
    return creada as unknown as Mesa;
  }

  async buscarTodas(): Promise<Mesa[]> {
    return this.prisma.mesa.findMany({
      orderBy: { numero: 'asc' } // Ordenado para mantener la grilla alineada
    }) as unknown as Mesa[];
  }

  async actualizarEstado(id: string, nuevoEstado: any): Promise<Mesa> {
    // Setea la hora actual si pasa a OCUPADA, o la limpia si se libera a DISPONIBLE
    const horaInicio = nuevoEstado === 'OCUPADA' ? new Date() : null;

    const actualizada = await this.prisma.mesa.update({
      where: { id },
      data: { 
        estado: nuevoEstado as any,
        horaInicio: horaInicio
      },
    });
    
    return actualizada as unknown as Mesa;
  }
}