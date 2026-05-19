import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MesaService, Mesa } from '../../../data/services/mesa.service';

@Component({
  selector: 'app-panel-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-mesas.component.html'
})
export class PanelMesasComponent implements OnInit, OnDestroy {
  private intervaloCronometro: any;

  mesas: Mesa[] = [];
  cargando: boolean = true;

  // Estados de control del modal CRUD
  mostrarModalNuevaMesa = false;
  editando = false;
  mesaSeleccionada: Mesa | null = null;

  nuevoNumero!: number;
  nuevoTipo: string = 'Pool';
  nuevoPrecio: number = 25;

  constructor(private mesaService: MesaService) {}

  ngOnInit(): void {
    this.cargarMesas();

    this.intervaloCronometro = setInterval(() => {
      this.actualizarTiempos();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervaloCronometro) clearInterval(this.intervaloCronometro);
  }

  cargarMesas() {
    this.cargando = true;
    this.mesaService.obtenerMesas().subscribe({
      next: (data) => {
        this.mesas = data.map(m => ({
          ...m,
          tiempoTranscurrido: '00:00:00',
          costoAcumulado: 0
        }));
        this.cargando = false;
        this.actualizarTiempos();
      },
      error: (err) => {
        console.error('Error al cargar mesas desde la BD:', err);
        this.cargando = false;
      }
    });
  }

  abrirModalNuevaMesa() {
    this.editando = false;
    this.mesaSeleccionada = null;
    this.mostrarModalNuevaMesa = true;
    this.nuevoNumero = this.mesas.length + 1;
    this.nuevoTipo = 'Pool';
    this.nuevoPrecio = 25;
  }

  abrirModalEditar(mesa: Mesa) {
    this.editando = true;
    this.mesaSeleccionada = mesa;
    this.nuevoNumero = mesa.numero;
    this.nuevoTipo = mesa.tipo;
    this.nuevoPrecio = mesa.precioPorHora;
    this.mostrarModalNuevaMesa = true;
  }

  cerrarModalNuevaMesa() {
    this.mostrarModalNuevaMesa = false;
    this.mesaSeleccionada = null;
  }

  guardarNuevaMesa() {
    if (this.nuevoNumero && this.nuevoPrecio) {
      const datosMesa: Mesa = {
        numero: this.nuevoNumero,
        tipo: this.nuevoTipo,
        precioPorHora: this.nuevoPrecio,
        estado: this.mesaSeleccionada ? this.mesaSeleccionada.estado : 'DISPONIBLE'
      };

      if (this.editando && this.mesaSeleccionada?.id) {
        alert(`✏️ Cambios preparados para Mesa ${datosMesa.numero} (${datosMesa.precioPorHora} Bs/Hr).`);
        this.cargarMesas();
        this.cerrarModalNuevaMesa();
      } else {
        this.mesaService.crearMesa(datosMesa).subscribe({
          next: () => {
            this.cargarMesas();
            this.cerrarModalNuevaMesa();
          },
          error: (err) => console.error('Error al guardar la nueva mesa:', err)
        });
      }
    }
  }

  eliminarMesa(mesa: Mesa) {
    if (!mesa.id) return;
    const confirmar = confirm(`🗑️ ¿Estás seguro de que deseas eliminar la Mesa ${mesa.numero} del sistema de forma permanente?`);
    if (confirmar) {
      this.mesas = this.mesas.filter(m => m.id !== mesa.id);
      alert(`Mesa ${mesa.numero} removida de la vista.`);
    }
  }

  toggleMesa(mesa: Mesa) {
    if (mesa.estado === 'DISPONIBLE') {
      this.abrirMesa(mesa);
    } else if (mesa.estado === 'OCUPADA') {
      this.cerrarMesa(mesa);
    }
  }

  abrirMesa(mesa: Mesa) {
    if (!mesa.id) return;

    this.mesaService.actualizarEstado(mesa.id, 'OCUPADA').subscribe({
      next: () => {
        mesa.estado = 'OCUPADA';
        mesa.horaInicio = new Date();
        mesa.tiempoTranscurrido = '00:00:00';
        mesa.costoAcumulado = 0;
        this.cargarMesas(); // Recargamos para sincronizar con la fecha de la BD
      },
      error: (err) => console.error('Error al abrir mesa en servidor:', err)
    });
  }

  actualizarTiempos() {
    const ahora = new Date().getTime();

    this.mesas.forEach(mesa => {
      if (mesa.estado === 'OCUPADA' && mesa.horaInicio) {
        const inicioMs = new Date(mesa.horaInicio).getTime();
        const diferenciaMili = ahora - inicioMs;

        if (diferenciaMili > 0) {
          const totalSegundos = Math.floor(diferenciaMili / 1000);

          const hrs = Math.floor(totalSegundos / 3600);
          const mins = Math.floor((totalSegundos % 3600) / 60);
          const segs = totalSegundos % 60;

          mesa.tiempoTranscurrido = `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(segs)}`;

          const horasDecimales = totalSegundos / 60;
          mesa.costoAcumulado = Number((horasDecimales * mesa.precioPorHora).toFixed(2));
        } else {
          mesa.tiempoTranscurrido = '00:00:00';
          mesa.costoAcumulado = 0;
        }
      }
    });
  }

  cerrarMesa(mesa: Mesa) {
    if (!mesa.id) return;

    // BLINDAJE: Si la fecha falló o vino null, definimos valores en 0 por seguridad
    const tiempo = mesa.tiempoTranscurrido || '00:00:00';
    const total = mesa.costoAcumulado || 0;

    alert(`🛑 RECIBO DE COBRO - MESA ${mesa.numero}\n\n` +
          `• Tiempo de Juego: ${tiempo}\n` +
          `• Total Neto a Cobrar: ${total.toFixed(2)} Bs.`);

    this.mesaService.actualizarEstado(mesa.id, 'DISPONIBLE').subscribe({
      next: () => {
        mesa.estado = 'DISPONIBLE';
        mesa.horaInicio = null;
        mesa.tiempoTranscurrido = '00:00:00';
        mesa.costoAcumulado = 0;
        this.cargarMesas(); // Forzamos recarga limpia desde PostgreSQL
      },
      error: (err) => console.error('Error al cerrar mesa en servidor:', err)
    });
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
