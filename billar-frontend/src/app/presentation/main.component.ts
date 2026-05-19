import { DashboardComponent } from './shared/layout/dashboard.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent], // <-- Registramos el Dashboard
  template: `<app-dashboard></app-dashboard>` // <-- Cambiamos el template principal
})
export class MainComponent {}
