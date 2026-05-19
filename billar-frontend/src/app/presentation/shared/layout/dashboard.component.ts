import { LoginComponent } from './../../components/auth/login.component';
import { PanelMesasComponent } from './../../components/mesas/panel-mesas.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from '../../components/clientes/clientes.component';
import { TiendaComponent } from '../../components/tienda/tienda.component';

interface UsuarioSesion {
  nombre: string;
  rol: 'Administrador' | 'Empleado';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PanelMesasComponent, LoginComponent, ClientesComponent, TiendaComponent],
  template: `
    <app-login *ngIf="!usuario" (loginSuccess)="manejarIngreso($event)"></app-login>

    <div *ngIf="usuario" class="flex h-screen bg-[#121318] text-gray-100 overflow-hidden">

      <aside class="w-64 bg-gray-950 border-r border-gray-800 flex flex-col justify-between">
        <div class="p-6">
          <div class="flex items-center space-x-3 mb-8">
            <div class="bg-teal-600 p-2 rounded-lg text-white font-bold text-xl">🎱</div>
            <span class="text-xl font-extrabold tracking-wider bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              BILLAR PRO
            </span>
          </div>

          <nav class="space-y-2">
            <button (click)="cambiarModulo('mesas')"
               [ngClass]="{'bg-teal-950/50 text-teal-400 border-l-4 border-teal-500': moduloActivo === 'mesas'}"
               class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition font-medium">
              <span>🎴</span> <span>Control de Mesas</span>
            </button>

            <button (click)="cambiarModulo('ventas')"
               [ngClass]="{'bg-teal-950/50 text-teal-400 border-l-4 border-teal-500': moduloActivo === 'ventas'}"
               class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition font-medium">
              <span>🍔</span> <span>Venta Alimentos</span>
            </button>

            <button (click)="cambiarModulo('clientes')"
               [ngClass]="{'bg-teal-950/50 text-teal-400 border-l-4 border-teal-500': moduloActivo === 'clientes'}"
               class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition font-medium">
              <span>👥</span> <span>Fidelidad Clientes</span>
            </button>
          </nav>
        </div>

        <div class="p-4 border-t border-gray-800 bg-gray-950 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-full bg-teal-600/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold">
              {{ usuario.nombre.charAt(0) }}
            </div>
            <div>
              <p class="text-sm font-semibold text-white">{{ usuario.nombre }}</p>
              <p class="text-xs text-gray-500">{{ usuario.rol }}</p>
            </div>
          </div>
          <button (click)="cerrarSesion()" class="text-gray-500 hover:text-rose-400 p-1.5 rounded transition" title="Cerrar Sesión">
            🚪
          </button>
        </div>
      </aside>

      <main class="flex-1 overflow-y-auto bg-[#121318]">
        <div *ngIf="moduloActivo === 'mesas'">
          <app-panel-mesas></app-panel-mesas>
        </div>

        <div *ngIf="moduloActivo === 'ventas'">
          <app-tienda></app-tienda>
        </div>

        <div *ngIf="moduloActivo === 'clientes'">
          <app-clientes></app-clientes>
        </div>
      </main>

    </div>
  `
})
export class DashboardComponent {
  moduloActivo: string = 'mesas';
  usuario: UsuarioSesion | null = null;

  manejarIngreso(usuarioAutenticado: UsuarioSesion): void {
    this.usuario = usuarioAutenticado;
    this.moduloActivo = 'mesas';
  }

  cerrarSesion(): void {
    this.usuario = null;
  }

  cambiarModulo(modulo: string): void {
    this.moduloActivo = modulo;
  }
}
