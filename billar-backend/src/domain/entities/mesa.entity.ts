
export enum EstadoMesa {
  DISPONIBLE = 'disponible',
  OCUPADA = 'ocupada',
  MANTENIMIENTO = 'mantenimiento',
}

export class Mesa {
  id: string;
  numero: number;
  tipo: string; // Ejemplo: 'Pool', 'Snooker', 'Billa'
  estado: EstadoMesa;
  precioPorHora: number;
  horaInicio?: Date; // Solo tendrá valor si la mesa está ocupada

  constructor(id: string, numero: number, tipo: string, precio: number) {
    this.id = id;
    this.numero = numero;
    this.tipo = tipo;
    this.precioPorHora = precio;
    this.estado = EstadoMesa.DISPONIBLE;
  }
}
