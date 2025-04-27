import { Routes } from '@angular/router';
import { ComputerComponent } from './components/computer/computer.component';
import { Windows95BootComponent } from './components/windows95/windows95-boot/windows95-boot.component';
import { Windows95Component } from './components/windows95/windows95.component';

export const routes: Routes = [
  {
    path: '',
    component: Windows95Component,
  },
  {
    path: 'computer',
    component: ComputerComponent,
  },
  {
    path: 'boot',
    component: Windows95BootComponent,
  }
];
