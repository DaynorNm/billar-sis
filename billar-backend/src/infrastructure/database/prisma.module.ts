import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ¡Muy importante! Permite que otros módulos lo usen
})
export class PrismaModule {}