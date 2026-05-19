import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-[#121318] px-4">
      <div class="max-w-md w-full bg-gray-950 border border-gray-800 rounded-2xl p-8 shadow-2xl">

        <div class="text-center mb-8">
          <div class="inline-flex bg-teal-600/10 p-4 rounded-full text-teal-400 border border-teal-500/20 text-3xl mb-3">
            🎱
          </div>
          <h2 class="text-3xl font-extrabold text-white tracking-tight">¡Bienvenido de nuevo!</h2>
          <p class="text-gray-400 mt-2 text-sm">Ingresa al sistema de control de Billar</p>
        </div>

        <div *ngIf="errorMessage" class="mb-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm p-3 rounded-lg flex items-center space-x-2">
          <span>⚠️</span>
          <span>{{ errorMessage }}</span>
        </div>

        <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="space-y-5">

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Usuario / Email</label>
            <input
              type="text"
              name="username"
              [(ngModel)]="username"
              required
              placeholder="admin o empleado"
              class="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-teal-500 transition text-sm"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              [(ngModel)]="password"
              required
              placeholder="••••••••"
              class="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-teal-500 transition text-sm"
            />
          </div>

          <button
            type="submit"
            [disabled]="!loginForm.form.valid"
            class="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-800 disabled:text-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-teal-600/10 text-sm mt-2"
          >
            Iniciar Sesión
          </button>
        </form>

        <div class="mt-6 pt-4 border-t border-gray-900 text-center">
          <p class="text-xs text-gray-500">
            💡 <span class="font-semibold text-gray-400">Prueba con:</span> admin/admin123 o empleado/emp123
          </p>
        </div>

      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  // Evento que le avisará al sistema que alguien se autenticó con éxito
  @Output() loginSuccess = new EventEmitter<{ nombre: string; rol: 'Administrador' | 'Empleado' }>();

  onLogin() {
    this.errorMessage = '';

    // Validación simulada en Frontend con roles unificados
    if (this.username === 'admin' && this.password === 'admin123') {
      this.loginSuccess.emit({ nombre: 'Daynor Mamani', rol: 'Administrador' });
    } else if (this.username === 'empleado' && this.password === 'emp123') {
      // Nos aseguramos de mandar el rol correcto
      this.loginSuccess.emit({ nombre: 'Carlos Pérez', rol: 'Empleado' });
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos. Inténtalo de nuevo.';
    }
  }
}
