import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiendaService, Producto } from '../../../data/services/tienda.service';

interface ItemCarrito {
  producto: Producto;
  shadowId?: string; // Para control interno si aplica
  cantidad: number;
}

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tienda.component.html' // Apunta al archivo externo corregido
})
export class TiendaComponent implements OnInit {
  categoriaSeleccionada = 'Todos';
  listaProductos: Producto[] = [];
  carrito: ItemCarrito[] = [];
  cargando = false;

  // Control del modal flotante
  mostrarModalNuevo = false;

  // Modelo para limpiar y capturar el nuevo item
  nuevoProducto: Partial<Producto> = {
    nombre: '',
    precioVenta: 0,
    stock: 0,
    categoria: 'Bebidas',
    descripcion: ''
  };

  constructor(private tiendaService: TiendaService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this.tiendaService.obtenerProductos().subscribe({
      next: (data) => {
        this.listaProductos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.cargando = false;
      }
    });
  }

  // --- FUNCIONES DEL FORMULARIO MODAL ---
  abrirModalNuevoProducto() {
    this.nuevoProducto = {
      nombre: '',
      precioVenta: 0,
      stock: 0,
      categoria: 'Bebidas',
      descripcion: ''
    };
    this.mostrarModalNuevo = true;
  }

  cerrarModalNuevoProducto() {
    this.mostrarModalNuevo = false;
  }

  guardarProducto() {
    if (!this.nuevoProducto.nombre?.trim()) return;

    // Ejecutamos el guardado real mediante el servicio HTTP
    this.tiendaService.crearProducto(this.nuevoProducto as any).subscribe({
      next: () => {
        this.cargarProductos(); // Recarga el catálogo dinámico desde Postgres
        this.cerrarModalNuevoProducto();
      },
      error: (err) => console.error('Error al guardar el nuevo insumo:', err)
    });
  }

  // --- CONTROL DEL CARRITO DE VENTAS ---
  agregarAlCarrito(producto: Producto) {
    if (producto.stock === 0) return;
    const itemExistente = this.carrito.find(item => item.producto.id === producto.id);
    if (itemExistente) {
      if (itemExistente.cantidad < producto.stock) itemExistente.cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }
  }

  calcularTotalPagar(): number {
    return this.carrito.reduce((sum, item) => sum + (item.producto.precioVenta * item.cantidad), 0);
  }

  procesarVenta() {
    if (this.carrito.length === 0) return;

    this.carrito.forEach(item => {
      const nuevoStock = item.producto.stock - item.cantidad;
      this.tiendaService.actualizarStock(item.producto.id, nuevoStock).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error('Error al actualizar stock:', err)
      });
    });

    alert(`✅ ¡Venta registrada con éxito en PostgreSQL!`);
    this.carrito = [];
  }
}
