import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClienteRepository } from '../../../domain/repositories/cliente.repository';
import { Cliente } from '../../../domain/entities/cliente.entity';

@Injectable()
export class PrismaClienteRepository implements ClienteRepository {
  constructor(private prisma: PrismaService) {}

  async crear(cliente: Cliente): Promise<Cliente> {
    const nuevo = await this.prisma.cliente.create({
      data: {
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        horasAcumuladas: cliente.horasAcumuladas,
      },
    });
    return nuevo as Cliente;
  }

  async buscarTodos(): Promise<Cliente[]> {
    const lista = await this.prisma.cliente.findMany({
      orderBy: { nombre: 'asc' },
    });
    return lista as Cliente[];
  }

  async acumularHoras(id: string, horas: number): Promise<Cliente> {
    const actualizado = await this.prisma.cliente.update({
      where: { id },
      data: {
        horasAcumuladas: {
          increment: horas, // Incrementa directamente el valor actual en la BD
        },
      },
    });
    return actualizado as Cliente;
  }
}