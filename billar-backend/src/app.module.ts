import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { PrismaMesaRepository } from './infrastructure/database/repositories/prisma-mesa.repository';
import { PrismaProductoRepository } from './infrastructure/database/repositories/prisma-producto.repository';
import { MesaController } from './presentation/controllers/mesa.controller';
import { ProductoController } from './presentation/controllers/producto.controller'; // <-- IMPORTA EL NUEVO CONTROLADOR
import { PrismaClienteRepository } from './infrastructure/database/repositories/prisma-cliente.repository';
import { ClienteController } from './presentation/controllers/cliente.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    MesaController, 
    ProductoController,
    ClienteController // <-- REGISTRA EL CONTROLADOR AQUÍ
  ],
  providers: [
    PrismaMesaRepository,
    PrismaProductoRepository,
    PrismaClienteRepository
  ],
})
export class AppModule {}