export interface Mesa {
  id?: string;
  numero: number;
  tipo: string;
  estado: 'DISPONIBLE' | 'OCUPADA' | 'MANTENIMIENTO';
  precioPorHora: number;
  horaInicio?: Date | null;
}
