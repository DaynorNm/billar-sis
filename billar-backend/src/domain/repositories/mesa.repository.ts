import { Mesa } from '../entities/mesa.entity';

export interface MesaRepository {
  crear(mesa: Mesa): Promise<Mesa>;
  buscarTodas(): Promise<Mesa[]>;
  actualizarEstado(id: string, nuevoEstado: string): Promise<Mesa>; // <-- AGREGA ESTA LÍNEA
}