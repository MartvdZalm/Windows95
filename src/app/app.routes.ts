import { Routes } from '@angular/router';
import { DesktopComponent } from './components/desktop.component';
import { ComputerComponent } from './components/computer/computer.component';
import { Win95BootScreenComponent } from './components/win95-boot-screen/win95-boot-screen.component';

export const routes: Routes = [
  {
    path: '',
    component: DesktopComponent,
  },
  {
    path: 'computer',
    component: ComputerComponent,
  },
  {
    path: 'boot',
    component: Win95BootScreenComponent,
  }
];
