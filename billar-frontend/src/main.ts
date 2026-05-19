import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { MainComponent } from './app/presentation/main.component'; // Apuntamos a tu componente raíz

bootstrapApplication(MainComponent, appConfig)
  .catch((err) => console.error(err));
