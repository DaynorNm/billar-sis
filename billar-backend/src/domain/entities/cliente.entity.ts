export class Cliente {
  constructor(
    public readonly nombre: string,
    public readonly telefono?: string,
    public readonly horasAcumuladas: number = 0,
    public readonly id?: string
  ) {}
}