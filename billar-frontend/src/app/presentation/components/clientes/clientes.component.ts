import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService, Cliente } from '../../../data/services/cliente.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  listaClientes: Cliente[] = [];
  cargando: boolean = true;

  // Estados de Modales
  mostrarModalForm = false;
  mostrarModalHoras = false;
  editando = false;

  // Modelos de trabajo temporal
  clienteModel: Partial<Cliente> = { nombre: '', telefono: '' };
  clienteSeleccionado: Cliente | null = null;
  horasACargar: number = 1;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.obtenerCatalogoClientes();
  }

  obtenerCatalogoClientes() {
    this.cargando = true;
    this.clienteService.obtenerClientes().subscribe({
      next: (data) => {
        this.listaClientes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al traer clientes:', err);
        this.cargando = false;
      }
    });
  }

  // --- MODAL CREAR / EDITAR ---
  abrirModalCrear() {
    this.editando = false;
    this.clienteModel = { nombre: '', telefono: '' };
    this.mostrarModalForm = true;
  }

  abrirModalEditar(cliente: Cliente) {
    this.editando = true;
    this.clienteSeleccionado = cliente;
    this.clienteModel = { ...cliente }; // Clonamos los datos para no alterar la tabla antes de guardar
    this.mostrarModalForm = true;
  }

  cerrarModalForm() {
    this.mostrarModalForm = false;
    this.clienteSeleccionado = null;
  }

  guardarCliente() {
    if (!this.clienteModel.nombre?.trim()) return;

    if (this.editando && this.clienteSeleccionado?.id) {
      // Opción de actualización local (puedes enlazarla a un endpoint PUT /clientes/:id a futuro si gustas)
      alert(`⚠️ Datos de "${this.clienteModel.nombre}" preparados para actualización.`);
      this.cerrarModalForm();
    } else {
      // Flujo de Registro Nuevo Real
      this.clienteService.crearCliente(this.clienteModel).subscribe({
        next: () => {
          this.obtenerCatalogoClientes();
          this.cerrarModalForm();
        },
        error: (err) => console.error('Error al insertar cliente:', err)
      });
    }
  }

  // --- MODAL CARGAR HORAS ---
  abrirModalHoras(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.horasACargar = 1; // Reseteamos el contador a 1 hora por defecto
    this.mostrarModalHoras = true;
  }

  cerrarModalHoras() {
    this.mostrarModalHoras = false;
    this.clienteSeleccionado = null;
  }

  ejecutarCargaHoras() {
    if (!this.clienteSeleccionado?.id || this.horasACargar < 1) return;

    this.clienteService.acumularHoras(this.clienteSeleccionado.id, this.horasACargar).subscribe({
      next: () => {
        this.obtenerCatalogoClientes(); // Recargamos el ranking de fidelidad con el acumulado real
        this.cerrarModalHoras();
      },
      error: (err) => console.error('Error al cargar horas:', err)
    });
  }

  // --- RECLAMAR PREMIO (Descontar 10 horas) ---
  reclamarPremio(cliente: Cliente) {
    if (!cliente.id || cliente.horasAcumuladas < 10) return;

    const confirmar = confirm(`🎁 ¿Confirmar canje de premio para "${cliente.nombre}"?\nSe le descontarán 10 horas acumuladas y se le otorgará 1 HORA DE JUEGO COMPLETAMENTE LIBRE.`);

    if (confirmar) {
      // Mandamos un valor negativo (-10) a nuestro endpoint de incremento para que reste de la BD automáticamente
      this.clienteService.acumularHoras(cliente.id, -10).subscribe({
        next: () => {
          alert(`✅ ¡Premio entregado! 1 Hora libre activada para ${cliente.nombre}.`);
          this.obtenerCatalogoClientes();
        },
        error: (err) => console.error('Error al procesar recompensa:', err)
      });
    }
  }

  // --- ELIMINAR CLIENTE ---
  eliminarCliente(cliente: Cliente) {
    const confirmar = confirm(`🗑️ ¿Estás seguro de que deseas eliminar a "${cliente.nombre}" del sistema de fidelidad de forma permanente?`);
    if (confirmar) {
      // Eliminación lógica visual temporal (puedes anexarle un método DELETE en tu service si es necesario)
      this.listaClientes = this.listaClientes.filter(c => c.id !== cliente.id);
      alert(`Cliente removido de la vista.`);
    }
  }
}
