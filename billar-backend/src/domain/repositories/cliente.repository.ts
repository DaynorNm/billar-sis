import { Cliente } from '../entities/cliente.entity';

export interface ClienteRepository {
  crear(cliente: Cliente): Promise<Cliente>;
  buscarTodos(): Promise<Cliente[]>;
  acumularHoras(id: string, horas: number): Promise<Cliente>;
}